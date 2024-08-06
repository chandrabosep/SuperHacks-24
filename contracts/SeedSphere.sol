// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {PythUtils} from "@pythnetwork/pyth-sdk-solidity/PythUtils.sol";

/// @notice Custom errors for the SeedSphere contract
error SeedSphere__InvalidAddress();
error SeedSphere__NoUsersProvided();
error SeedSphere__TotalDepositTooLow();
error SeedSphere__DepositPerUserTooLow();
error SeedSphere__UserHasNoActiveProposal();
error SeedSphere__PoolNotActive();
error SeedSphere__DepositAmountTooLow();
error SeedSphere__InvalidRandomNumber();
error SeedSphere__PoolFundsZero();
error SeedSphere__FeeTooLow();
error SeedSphere__InsufficientFunds();

/// @title SeedSphere Contract
/// @notice This contract allows funding projects and pooling funds among users, utilizing Pyth for price feeds.
contract SeedSphere is ERC1155, ERC1155Supply, Ownable {
    /// @notice Current token ID tracker
    uint256 private s_currentTokenId;

    /// @notice Mapping to store user funds
    mapping(address => uint256) private s_userFunds;

    /// @notice Mapping to store user proposal hashes
    mapping(address => bytes32) private s_userProposalHashes;

    /// @notice Mapping to store funder IDs
    mapping(address => uint256) private s_funderIds;

    /// @notice Boolean to indicate if the pool is active
    bool private s_poolActive;

    /// @notice Total pool funds
    uint256 private s_poolFunds;

    /// @notice Instance of the IPyth contract
    IPyth private s_pyth;

    /// @notice Price feed ID for ETH/USD
    bytes32 private s_priceFeedId =
        0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf;

    /// @notice Event emitted when funds are added
    event Funded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @notice Event emitted when the pool is funded
    event PoolFunded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @notice Event emitted when a project is added or updated
    event ProjectAdded(address indexed user, bytes32 proposalHash);

    /// @notice Event emitted when the pool ends
    event PoolEnded(uint256 indexed totalAmount, uint256 indexed userAmount);

    /// @notice Event emitted when a user withdraws funds
    event FundsWithdrawn(address indexed user, uint256 amount);

    /// @notice Constructor to initialize the SeedSphere contract
    /// @param pythContract_ Address of the Pyth contract
    /// @param priceFeedId_ Bytes32 Id for PriceFeed
    constructor(address pythContract_, bytes32 priceFeedId_)
        ERC1155("")
        Ownable(_msgSender())
    {
        s_pyth = IPyth(pythContract_);
        s_priceFeedId = priceFeedId_;
        s_poolActive = false;
    }

    /*****************************
        STATE UPDATE FUNCTIONS
    ******************************/

    /// @notice Function to fund user projects
    /// @param userAddresses Array of user addresses to fund
    /// @param priceUpdate Array of price update data from Pyth
    function fund(
        address[] calldata userAddresses,
        bytes[] calldata priceUpdate
    ) public payable {
        uint256 numUsers = userAddresses.length;
        if (numUsers == 0) revert SeedSphere__NoUsersProvided();

        // Get the update fee from Pyth
        uint256 fee = s_pyth.getUpdateFee(priceUpdate);

        // Update the price feeds
        s_pyth.updatePriceFeeds{value: fee}(priceUpdate);

        // Fetch the current price of ETH in USD
        PythStructs.Price memory currentPrice = s_pyth.getPrice(s_priceFeedId);

        // Convert the price to a uint with 18 decimals
        uint256 basePrice = PythUtils.convertToUint(
            currentPrice.price,
            currentPrice.expo,
            18
        );

        uint256 totalDeposits = msg.value - fee;
        if (totalDeposits == 0) revert SeedSphere__TotalDepositTooLow();

        uint256 depositPerUser = totalDeposits / numUsers;
        if (depositPerUser == 0) revert SeedSphere__DepositPerUserTooLow();

        // Calculate the USD equivalent of the deposit per user
        uint256 amountInUSD = (depositPerUser * basePrice) / 10**18;

        if (amountInUSD == 0) revert SeedSphere__DepositAmountTooLow();
        uint256 tokenId;
        if (checkFunderHaveId(_msgSender())) {
            tokenId = s_funderIds[_msgSender()];
        } else {
            tokenId = s_currentTokenId;
            s_currentTokenId += 1;
        }

        for (uint256 i = 0; i < numUsers; ++i) {
            if (getUserProposalHash(userAddresses[i]) == bytes32(0))
                revert SeedSphere__UserHasNoActiveProposal();
            s_userFunds[userAddresses[i]] += depositPerUser;
            _mint(_msgSender(), tokenId, amountInUSD, "");
        }

        emit Funded(_msgSender(), totalDeposits, tokenId);
    }

    /// @notice Function to fund the pool
    /// @param priceUpdate Array of price update data from Pyth
    function poolFunds(bytes[] calldata priceUpdate) public payable {
        if (!s_poolActive) revert SeedSphere__PoolNotActive();

        // Get the update fee from Pyth
        uint256 fee = s_pyth.getUpdateFee(priceUpdate);

        // Update the price feeds
        s_pyth.updatePriceFeeds{value: fee}(priceUpdate);

        // Fetch the current price of ETH in USD
        PythStructs.Price memory currentPrice = s_pyth.getPrice(s_priceFeedId);

        // Convert the price to a uint with 18 decimals
        uint256 basePrice = PythUtils.convertToUint(
            currentPrice.price,
            currentPrice.expo,
            18
        );

        uint256 totalDeposits = msg.value - fee;

        s_poolFunds += totalDeposits;
        // Calculate the USD equivalent of the sent ETH amount
        uint256 amountInUSD = (totalDeposits * basePrice) / 10**18;

        if (amountInUSD == 0) revert SeedSphere__DepositAmountTooLow();
        uint256 tokenId;
        if (checkFunderHaveId(_msgSender())) {
            tokenId = s_funderIds[_msgSender()];
        } else {
            tokenId = s_currentTokenId;
            s_currentTokenId += 1;
        }

        _mint(_msgSender(), tokenId, amountInUSD * 2, "");

        emit PoolFunded(_msgSender(), totalDeposits, tokenId);
    }

    /// @notice Adds or updates a project proposal
    /// @param proposalUserAddress Address of the user proposing the project
    /// @param proposalHash Hash of the proposal
    function addOrUpdateProject(
        address proposalUserAddress,
        bytes32 proposalHash
    ) public onlyOwner {
        s_userProposalHashes[proposalUserAddress] = proposalHash;
        emit ProjectAdded(proposalUserAddress, proposalHash);
    }

    /// @notice Ends the pool and distributes funds equally among users
    /// @param userAddresses Array of user addresses to receive funds
    function endPool(address[] calldata userAddresses) public onlyOwner {
        uint256 numUsers = userAddresses.length;
        if (s_poolFunds == 0) revert SeedSphere__PoolFundsZero();

        uint256 depositPerUser = s_poolFunds / numUsers;

        for (uint256 i = 0; i < numUsers; ++i) {
            s_userFunds[userAddresses[i]] += depositPerUser;
        }

        s_poolActive = false;

        emit PoolEnded(s_poolFunds, depositPerUser);
    }

    /// @notice Allows users to withdraw their funds
    function withdrawFunds() public {
        uint256 userBalance = s_userFunds[_msgSender()];
        if (userBalance == 0) revert SeedSphere__InsufficientFunds();

        s_userFunds[_msgSender()] = 0;
        (bool success, ) = _msgSender().call{value: userBalance}("");
        require(success, "Transfer failed");

        emit FundsWithdrawn(_msgSender(), userBalance);
    }

    /*****************************
            SETTER FUNCTIONS
    ******************************/

    /// @notice Sets the base URI for the token metadata
    /// @param newuri New base URI for the tokens
    function setBaseURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    /// @notice Sets the pool active status
    /// @param _poolActive Boolean indicating if the pool is active or not
    function setPoolActive(bool _poolActive) external onlyOwner {
        s_poolActive = _poolActive;
    }

    /// @notice Activates the pool
    function activatePool() public onlyOwner {
        s_poolActive = true;
    }

    /// @notice Updates the Pyth contract address
    /// @param _newPythContract The new address of the Pyth contract
    function updatePythContract(address _newPythContract) public onlyOwner {
        s_pyth = IPyth(_newPythContract);
    }

    /// @notice Updates the price feed ID
    /// @param _newPriceFeedId The new price feed ID
    function updatePriceFeed(bytes32 _newPriceFeedId) public onlyOwner {
        s_priceFeedId = _newPriceFeedId;
    }

    /// @notice Updates the address of a user proposal
    /// @param oldUserProposalAddress The current address of the user proposal
    /// @param newUserProposalAddress The new address to assign to the user proposal
    function updateUserProposalAddress(
        address oldUserProposalAddress,
        address newUserProposalAddress
    ) public onlyOwner {
        uint256 userFunds = s_userFunds[oldUserProposalAddress];
        delete s_userFunds[oldUserProposalAddress];
        s_userFunds[newUserProposalAddress] = userFunds;

        bytes32 proposalHash = s_userProposalHashes[oldUserProposalAddress];
        delete s_userProposalHashes[oldUserProposalAddress];
        s_userProposalHashes[newUserProposalAddress] = proposalHash;
    }

    /// @notice Updates the proposal hash for a user
    /// @param userProposalAddress The address of the user proposal to update
    /// @param newUserProposalHash The new proposal hash to assign
    function updateUserProposalHash(
        address userProposalAddress,
        bytes32 newUserProposalHash
    ) public onlyOwner {
        s_userProposalHashes[userProposalAddress] = newUserProposalHash;
    }

    /*****************************
            GETTER FUNCTIONS
    ******************************/

    /// @notice Checks if the funder has an ID
    /// @param funderAddress Address of the funder to check
    /// @return Boolean indicating if the funder has an ID
    function checkFunderHaveId(address funderAddress)
        public
        view
        returns (bool)
    {
        return balanceOf(funderAddress, s_funderIds[funderAddress]) > 0;
    }

    /// @notice Returns the Uniform Resource Identifier (URI) for a given token ID
    /// @param tokenId The token ID for which to retrieve the URI
    /// @return A string representing the URI for the given token ID
    function uri(uint256 tokenId)
        public
        view
        virtual
        override(ERC1155)
        returns (string memory)
    {
        return string.concat(super.uri(tokenId), Strings.toString(tokenId));
    }

    /// @notice Checks if the user has an active proposal
    /// @param proposalUserAddress Address of the user to check
    /// @return Proposal hash of the user
    function getUserProposalHash(address proposalUserAddress)
        public
        view
        returns (bytes32)
    {
        return s_userProposalHashes[proposalUserAddress];
    }

    /// @notice Gets the current token ID
    /// @return Current token ID
    function getCurrentTokenId() public view returns (uint256) {
        return s_currentTokenId;
    }

    /*****************************
        GETTER FUNCTIONS
    ******************************/

    /// @dev Override required by Solidity for multiple inheritance
    /// @param from Address of the sender
    /// @param to Address of the receiver
    /// @param ids Array of token IDs being transferred
    /// @param values Array of amounts being transferred
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
