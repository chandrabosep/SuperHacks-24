// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Import ERC721 standard from OpenZeppelin
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol"; // Import Ownable contract from OpenZeppelin
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol"; // Import ReentrancyGuard contract from OpenZeppelin
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol"; // Import Strings utility from OpenZeppelin
import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol"; // Import IPyth interface
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol"; // Import PythStructs for data structures

/// @notice Custom errors for the SeedSphere contract
error SeedSphere__InvalidAddress(); // Error for invalid address
error SeedSphere__NoUsersProvided(); // Error for no users provided
error SeedSphere__TotalDepositTooLow(); // Error for total deposit being too low
error SeedSphere__DepositPerUserTooLow(); // Error for deposit per user being too low
error SeedSphere__UserHasNoActiveProposal(); // Error for user having no active proposal
error SeedSphere__PoolNotActive(); // Error for pool not being active
error SeedSphere__DepositAmountTooLow(); // Error for deposit amount being too low
error SeedSphere__InvalidRandomNumber(); // Error for invalid random number
error SeedSphere__PoolFundsZero(); // Error for pool funds being zero
error SeedSphere__FeeTooLow(); // Error for fee being too low
error SeedSphere__InsufficientFunds(); // Error for insufficient funds
error SeedSphere__TransferFailed(); // Error for transfer failure
error SeedSphere__StalePrice(); // Error for stale price data

/// @title SeedSphere Contract
/// @notice This contract allows funding projects and pooling funds among users, utilizing Pyth for price feeds.
contract SeedSphere is ERC721, Ownable, ReentrancyGuard {
    /// @notice Current token ID tracker
    uint256 private s_currentTokenId;

    /// @notice Mapping to store user funds
    mapping(address => uint256) private s_userFunds;

    /// @notice Mapping to store user proposal hashes
    mapping(address => bytes32) private s_userProposalHashes;

    /// @notice Mapping to store funder IDs
    mapping(address => uint256) private s_funderIds;

    /// @notice Mapping to store total funded amount in USD by token ID
    mapping(uint256 => uint256) private s_totalFundedInUSD;

    /// @notice Boolean to indicate if the pool is active
    bool private s_poolActive;

    /// @notice Total pool funds
    uint256 private s_poolFunds;

    /// @notice Instance of the IPyth contract
    IPyth private s_pyth;

    /// @notice Price feed ID for NATIVE/USD
    bytes32 private s_priceFeedId;

    /// @notice Base URI for token metadata
    string private s_baseUri;

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

    /// @notice Event emitted when the pool status is changed
    event PoolStatusChanged(bool isActive);

    /// @notice Constructor to initialize the SeedSphere contract
    /// @param pythContract_ Address of the Pyth contract
    /// @param priceFeedId_ Bytes32 Id for PriceFeed
    constructor(address pythContract_, bytes32 priceFeedId_)
        ERC721("SeedSphere", "BLOOM") // Initialize ERC721 with name and symbol
        Ownable(_msgSender())
    {
        s_pyth = IPyth(pythContract_); // Set the Pyth contract address
        s_priceFeedId = priceFeedId_; // Set the price feed ID
        s_baseUri = "https://seedsphere/royalty/"; // Set the base URI for token metadata
        s_poolActive = false; // Initialize pool as inactive
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
    ) public payable nonReentrant {
        uint256 numUsers = userAddresses.length; // Get number of users
        if (numUsers == 0) revert SeedSphere__NoUsersProvided(); // Revert if no users provided

        uint256 basePrice = _updatePythPriceFeeds(priceUpdate); // Update the price feeds and get base price

        uint256 totalDeposits = msg.value - s_pyth.getUpdateFee(priceUpdate); // Calculate total deposits
        if (totalDeposits == 0) revert SeedSphere__TotalDepositTooLow(); // Revert if total deposit is too low

        uint256 depositPerUser = totalDeposits / numUsers; // Calculate deposit per user
        if (depositPerUser == 0) revert SeedSphere__DepositPerUserTooLow(); // Revert if deposit per user is too low

        uint256 totalAmountInUSD = (totalDeposits * basePrice) / 10**18; // Calculate total amount in USD
        if (totalAmountInUSD == 0) revert SeedSphere__DepositAmountTooLow(); // Revert if deposit amount is too low

        uint256 tokenId = _assignTokenId(_msgSender()); // Assign a token ID to the funder

        for (uint256 i = 0; i < numUsers; ++i) {
            if (getUserProposalHash(userAddresses[i]) == bytes32(0))
                revert SeedSphere__UserHasNoActiveProposal(); // Revert if user has no active proposal
            s_userFunds[userAddresses[i]] += depositPerUser; // Add deposit to user funds
        }
        s_totalFundedInUSD[tokenId] += totalAmountInUSD; // Update total funded amount in USD

        emit Funded(_msgSender(), totalDeposits, tokenId); // Emit Funded event
    }

    /// @notice Function to fund the pool
    /// @param priceUpdate Array of price update data from Pyth
    function poolFunds(bytes[] calldata priceUpdate)
        public
        payable
        nonReentrant
    {
        if (!s_poolActive) revert SeedSphere__PoolNotActive(); // Revert if pool is not active

        uint256 basePrice = _updatePythPriceFeeds(priceUpdate); // Update the price feeds and get base price

        uint256 totalDeposits = msg.value - s_pyth.getUpdateFee(priceUpdate); // Calculate total deposits

        s_poolFunds += totalDeposits; // Update pool funds

        uint256 amountInUSD = (totalDeposits * basePrice) / 10**18; // Calculate amount in USD
        if (amountInUSD == 0) revert SeedSphere__DepositAmountTooLow(); // Revert if deposit amount is too low

        uint256 tokenId = _assignTokenId(_msgSender()); // Assign a token ID to the funder

        s_totalFundedInUSD[tokenId] += amountInUSD * 2; // Update total funded amount in USD

        emit PoolFunded(_msgSender(), totalDeposits, tokenId); // Emit PoolFunded event
    }

    /// @notice Adds or updates a project proposal
    /// @param proposalUserAddress Address of the user proposing the project
    /// @param proposalHash Hash of the proposal
    function addOrUpdateProject(
        address proposalUserAddress,
        bytes32 proposalHash
    ) public onlyOwner {
        if (proposalUserAddress == address(0))
            revert SeedSphere__InvalidAddress(); // Revert if address is invalid
        s_userProposalHashes[proposalUserAddress] = proposalHash; // Update proposal hash
        emit ProjectAdded(proposalUserAddress, proposalHash); // Emit ProjectAdded event
    }

    /// @notice Ends the pool and distributes funds equally among users
    /// @param userAddresses Array of user addresses to receive funds
    function endPool(address[] calldata userAddresses) public onlyOwner {
        uint256 numUsers = userAddresses.length; // Get number of users
        if (s_poolFunds == 0) revert SeedSphere__PoolFundsZero(); // Revert if pool funds are zero

        uint256 depositPerUser = s_poolFunds / numUsers; // Calculate deposit per user

        for (uint256 i = 0; i < numUsers; ++i) {
            s_userFunds[userAddresses[i]] += depositPerUser; // Distribute funds to users
        }

        s_poolActive = false; // Set pool as inactive

        emit PoolEnded(s_poolFunds, depositPerUser); // Emit PoolEnded event
    }

    /// @notice Allows users to withdraw their funds
    function withdrawFunds() public nonReentrant {
        uint256 userBalance = s_userFunds[_msgSender()]; // Get user balance
        if (userBalance == 0) revert SeedSphere__InsufficientFunds(); // Revert if insufficient funds

        s_userFunds[_msgSender()] = 0; // Reset user funds
        (bool success, ) = _msgSender().call{value: userBalance}(""); // Transfer funds to user
        if (!success) revert SeedSphere__TransferFailed(); // Revert if transfer fails

        emit FundsWithdrawn(_msgSender(), userBalance); // Emit FundsWithdrawn event
    }

    /*****************************
            SETTER FUNCTIONS
    ******************************/

    /// @notice Sets the pool active status
    /// @param _poolActive Boolean indicating if the pool is active or not
    function setPoolActive(bool _poolActive) external onlyOwner {
        s_poolActive = _poolActive; // Set pool active status
        emit PoolStatusChanged(_poolActive); // Emit PoolStatusChanged event
    }

    /// @notice Activates the pool
    function activatePool() public onlyOwner {
        s_poolActive = true; // Activate pool
        emit PoolStatusChanged(true); // Emit PoolStatusChanged event
    }

    /// @notice Updates the Pyth contract address
    /// @param _newPythContract The new address of the Pyth contract
    function updatePythContract(address _newPythContract) public onlyOwner {
        s_pyth = IPyth(_newPythContract); // Update Pyth contract address
    }

    /// @notice Updates the price feed ID
    /// @param _newPriceFeedId The new price feed ID
    function updatePriceFeed(bytes32 _newPriceFeedId) public onlyOwner {
        s_priceFeedId = _newPriceFeedId; // Update price feed ID
    }

    /// @notice Updates the address of a user proposal
    /// @param oldUserProposalAddress The current address of the user proposal
    /// @param newUserProposalAddress The new address to assign to the user proposal
    function updateUserProposalAddress(
        address oldUserProposalAddress,
        address newUserProposalAddress
    ) public onlyOwner {
        uint256 userFunds = s_userFunds[oldUserProposalAddress]; // Get user funds
        delete s_userFunds[oldUserProposalAddress]; // Delete old user funds
        s_userFunds[newUserProposalAddress] = userFunds; // Set new user funds

        bytes32 proposalHash = s_userProposalHashes[oldUserProposalAddress]; // Get proposal hash
        delete s_userProposalHashes[oldUserProposalAddress]; // Delete old proposal hash
        s_userProposalHashes[newUserProposalAddress] = proposalHash; // Set new proposal hash
    }

    /// @notice Updates the proposal hash for a user
    /// @param userProposalAddress The address of the user proposal to update
    /// @param newUserProposalHash The new proposal hash to assign
    function updateUserProposalHash(
        address userProposalAddress,
        bytes32 newUserProposalHash
    ) public onlyOwner {
        s_userProposalHashes[userProposalAddress] = newUserProposalHash; // Update proposal hash
    }

    /*****************************
            GETTER FUNCTIONS
    ******************************/

    /// @notice Retuns the base URI for the token metadata
    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseUri; // Return base URI
    }

    /// @notice Checks if the funder has an ID
    /// @param funderAddress Address of the funder to check
    /// @return Boolean indicating if the funder has an ID
    function checkFunderHaveId(address funderAddress)
        public
        view
        returns (bool)
    {
        return balanceOf(funderAddress) == 1; // Return true if funder has an ID
    }

    /// @notice Checks if the user has an active proposal
    /// @param proposalUserAddress Address of the user to check
    /// @return Proposal hash of the user
    function getUserProposalHash(address proposalUserAddress)
        public
        view
        returns (bytes32)
    {
        return s_userProposalHashes[proposalUserAddress]; // Return proposal hash
    }

    /// @notice Gets the current token ID
    /// @return Current token ID
    function getCurrentTokenId() public view returns (uint256) {
        return s_currentTokenId; // Return current token ID
    }

    /// @notice Calculates the Wei amount equivalent to one USD
    /// @param price Price data from Pyth
    /// @return oneDollarInWei The amount of Wei equivalent to one USD
    function getScaledAmount(PythStructs.Price memory price)
        public
        pure
        returns (uint256 oneDollarInWei)
    {
        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) * (10**18)) /
            (10**uint8(uint32(-1 * price.expo))); // Convert the price to 18 decimal places
        oneDollarInWei = ((10**18) * (10**18)) / ethPrice18Decimals; // Calculate the Wei amount equivalent to one USD
        return oneDollarInWei; // Return oneDollarInWei
    }

    /*****************************
        INTERNAL FUNCTIONS
    ******************************/

    /// @notice Internal function to update Pyth price feeds and get the current price
    /// @param priceUpdate Array of price update data from Pyth
    /// @return oneDollarInWei The amount of Wei equivalent to one USD
    function _updatePythPriceFeeds(bytes[] calldata priceUpdate)
        private
        returns (uint256 oneDollarInWei)
    {
        uint256 fee = s_pyth.getUpdateFee(priceUpdate); // Get the update fee
        s_pyth.updatePriceFeeds{value: fee}(priceUpdate); // Update the price feeds
        PythStructs.Price memory price = s_pyth.getPrice(s_priceFeedId); // Get the current price

        if (block.timestamp - price.publishTime > s_pyth.getValidTimePeriod()) {
            revert SeedSphere__StalePrice(); // Revert if price data is stale
        }

        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) * (10**18)) /
            (10**uint8(uint32(-1 * price.expo))); // Convert the price to 18 decimal places
        oneDollarInWei = ((10**18) * (10**18)) / ethPrice18Decimals; // Calculate the Wei amount equivalent to one USD
        return oneDollarInWei; // Return oneDollarInWei
    }

    /// @notice Internal function to assign a token ID to a funder
    /// @param funder Address of the funder
    /// @return tokenId The assigned token ID
    function _assignTokenId(address funder) private returns (uint256 tokenId) {
        if (checkFunderHaveId(funder)) {
            tokenId = s_funderIds[funder]; // Return existing token ID if funder has an ID
        } else {
            tokenId = getCurrentTokenId(); // Assign new token ID
            s_currentTokenId = s_currentTokenId + 1; // Increment current token ID
            s_funderIds[funder] = tokenId; // Map funder address to token ID
            _mint(funder, tokenId); // Mint new token
        }
    }

    /*****************************
        OVERRIDE FUNCTIONS
    ******************************/

    /// @notice Allows the contract owner to withdraw contract balance
    function withdraw() public onlyOwner {
        payable(_msgSender()).transfer(address(this).balance); // Transfer contract balance to owner
    }
}
