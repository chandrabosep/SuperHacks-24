// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC4626A, IERC4626A} from "./ERC4626A/ERC4626A.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

/// @dev Custom error for invalid address input.
error SeedSphere__InvalidAddress();

/// @dev Custom error for when no user addresses are provided.
error SeedSphere__NoUsersProvided();

/// @dev Custom error for when the total deposit is too low.
error SeedSphere__TotalDepositTooLow();

/// @dev Custom error for when the deposit per user is too low.
error SeedSphere__DepositPerUserTooLow();

/// @dev Custom error for when a user has no active proposal.
error SeedSphere__UserHasNoActiveProposal();

/// @dev Custom error for when the pool is not active.
error SeedSphere__PoolNotActive();

/// @dev Custom error for when the deposit amount is too low.
error SeedSphere__DepositAmountTooLow();

/// @dev Custom error for invalid random number generation.
error SeedSphere__InvalidRandomNumber();

/// @dev Custom error for when the pool funds are zero.
error SeedSphere__PoolFundsZero();

/// @dev Custom error for when the fee is too low.
error SeedSphere__FeeTooLow();

/// @dev Custom error for insufficient funds.
error SeedSphere__InsufficientFunds();

/// @dev Custom error for transfer failure.
error SeedSphere__TransferFailed();

/// @dev Custom error for when the price feed data is stale.
error SeedSphere__StalePrice();

/// @title SeedSphere
/// @dev Contract extending ERC4626A with additional asset management and pooling functionalities.
contract SeedSphereTest is ERC4626A, Ownable, ReentrancyGuard {
    /// @dev Mapping to store the funds of each user.
    mapping(address => uint256) private s_userBalances;

    /// @dev Mapping to store the proposal hashes for each user.
    mapping(address => bytes32) private s_proposalHashes;

    /// @dev Mapping to store the total amount funded in USD for each token ID.
    mapping(uint256 => uint256) private s_totalFundedUSD;

    /// @dev Boolean to track if the funding pool is active.
    bool private s_isPoolActive;

    /// @dev Variable to track the total funds in the pool.
    uint256 private s_poolBalance;

    /// @dev Instance of the Pyth contract for price feeds.
    IPyth private s_pyth;

    /// @dev Price feed ID used to get ETH/USD price data.
    bytes32 private s_priceFeedId;

    /// @dev Base URI for metadata.
    string private s_baseUri;

    /// @dev Event emitted when funds are deposited by a user.
    /// @param funder The address of the user who deposited funds.
    /// @param amount The amount of funds deposited.
    /// @param tokenId The token ID associated with the deposit.
    event Funded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @dev Event emitted when the pool is funded.
    /// @param funder The address of the user who funded the pool.
    /// @param amount The amount of funds added to the pool.
    /// @param tokenId The token ID associated with the deposit.
    event PoolFunded(address indexed funder, uint256 amount, uint256 tokenId);

    /// @dev Event emitted when a project is added or updated.
    /// @param user The address of the user whose project was added/updated.
    /// @param proposalHash The hash of the project proposal.
    event ProjectAdded(address indexed user, bytes32 proposalHash);

    /// @dev Event emitted when the pool ends.
    /// @param totalAmount The total amount of funds in the pool.
    /// @param userAmount The amount of funds allocated per user.
    event PoolEnded(uint256 indexed totalAmount, uint256 indexed userAmount);

    /// @dev Event emitted when a user withdraws funds.
    /// @param user The address of the user who withdrew funds.
    /// @param amount The amount of funds withdrawn.
    event FundsWithdrawn(address indexed user, uint256 amount);

    /// @dev Event emitted when the pool's active status changes.
    /// @param isActive The new status of the pool (true for active, false for inactive).
    event PoolStatusChanged(bool isActive);

    /// @dev Constructor to initialize the SeedSphere contract.
    /// @param pythContract_ The address of the Pyth contract for price feeds.
    /// @param priceFeedId_ The price feed ID used to get ETH/USD price data.
    constructor(address pythContract_, bytes32 priceFeedId_)
        ERC4626A("SeedSphere", "SST")
        Ownable(_msgSender())
    {
        s_pyth = IPyth(pythContract_);
        s_priceFeedId = priceFeedId_;
        s_baseUri = "https://seedsphere/royalty/";
        s_isPoolActive = false;
    }

    /// @dev Function to fund multiple users with a single transaction.
    /// @param userAddresses Array of user addresses to be funded.
    /// @param priceUpdate Array of price update data from Pyth.
    function fund(
        address[] calldata userAddresses,
        bytes[] calldata priceUpdate
    ) public payable nonReentrant {
        uint256 numUsers = userAddresses.length;
        if (numUsers == 0) revert SeedSphere__NoUsersProvided();

        uint256 basePrice = _updatePythPriceFeeds(priceUpdate);
        uint256 totalDeposits = msg.value - s_pyth.getUpdateFee(priceUpdate);
        if (totalDeposits == 0) revert SeedSphere__TotalDepositTooLow();

        uint256 depositPerUser = totalDeposits / numUsers;
        if (depositPerUser == 0) revert SeedSphere__DepositPerUserTooLow();

        uint256 totalAmountInUSD = (totalDeposits * basePrice) / 10**18;
        if (totalAmountInUSD == 0) revert SeedSphere__DepositAmountTooLow();

        uint256 tokenId = deposit(msg.value, _msgSender());

        for (uint256 i = 0; i < numUsers; ++i) {
            if (getUserProposalHash(userAddresses[i]) == bytes32(0))
                revert SeedSphere__UserHasNoActiveProposal();
            s_userBalances[userAddresses[i]] += depositPerUser;
        }

        s_totalFundedUSD[tokenId] += totalAmountInUSD;

        emit Funded(_msgSender(), totalDeposits, tokenId);
    }

    /// @dev Function to fund the pool.
    /// @param priceUpdate Array of price update data from Pyth.
    function poolFunds(bytes[] calldata priceUpdate)
        public
        payable
        nonReentrant
    {
        if (!s_isPoolActive) revert SeedSphere__PoolNotActive();

        uint256 basePrice = _updatePythPriceFeeds(priceUpdate);
        uint256 totalDeposits = msg.value - s_pyth.getUpdateFee(priceUpdate);

        s_poolBalance += totalDeposits;
        uint256 amountInUSD = (totalDeposits * basePrice) / 10**18;
        if (amountInUSD == 0) revert SeedSphere__DepositAmountTooLow();

        uint256 tokenId = deposit(msg.value, _msgSender());

        s_totalFundedUSD[tokenId] += amountInUSD * 2;

        emit PoolFunded(_msgSender(), totalDeposits, tokenId);
    }

    /// @dev Function for users to withdraw their funds.
    function withdrawFunds() public nonReentrant {
        uint256 userBalance = s_userBalances[_msgSender()]; // Get user balance
        if (userBalance == 0) revert SeedSphere__InsufficientFunds(); // Revert if insufficient funds

        s_userBalances[_msgSender()] = 0; // Reset user funds

        /// Can add a platform fee in the future, but for now, it's free to use!

        (bool success, ) = _msgSender().call{value: userBalance}(""); // Transfer funds to user
        if (!success) revert SeedSphere__TransferFailed(); // Revert if transfer fails

        emit FundsWithdrawn(_msgSender(), userBalance); // Emit FundsWithdrawn event
    }

    /// @dev Function for the owner to add or update a project proposal.
    /// @param proposalUserAddress The address of the user for the proposal.
    /// @param proposalHash The hash of the proposal.
    function addOrUpdateProject(
        address proposalUserAddress,
        bytes32 proposalHash
    ) public onlyOwner {
        if (proposalUserAddress == address(0))
            revert SeedSphere__InvalidAddress();
        s_proposalHashes[proposalUserAddress] = proposalHash;
        emit ProjectAdded(proposalUserAddress, proposalHash);
    }

    /// @dev Function for the owner to end the funding pool and distribute funds.
    /// @param userAddresses Array of user addresses to distribute funds to.
    function endPool(address[] calldata userAddresses) public onlyOwner {
        uint256 numUsers = userAddresses.length;
        if (s_poolBalance == 0) revert SeedSphere__PoolFundsZero();

        uint256 depositPerUser = s_poolBalance / numUsers;

        for (uint256 i = 0; i < numUsers; ++i) {
            s_userBalances[userAddresses[i]] += depositPerUser;
        }

        s_isPoolActive = false;

        emit PoolEnded(s_poolBalance, depositPerUser);
    }

    /// @dev Function for the owner to set the pool active or inactive.
    /// @param _poolActive Boolean indicating if the pool should be active or inactive.
    function setPoolActive(bool _poolActive) external onlyOwner {
        s_isPoolActive = _poolActive;
        emit PoolStatusChanged(_poolActive);
    }

    /// @dev Function for the owner to activate the pool.
    function activatePool() public onlyOwner {
        s_isPoolActive = true;
        emit PoolStatusChanged(true);
    }

    /// @dev Function for the owner to update the Pyth contract address.
    /// @param _newPythContract The new address of the Pyth contract.
    function updatePythContract(address _newPythContract) public onlyOwner {
        s_pyth = IPyth(_newPythContract);
    }

    /// @dev Function for the owner to update the price feed ID.
    /// @param _newPriceFeedId The new price feed ID.
    function updatePriceFeed(bytes32 _newPriceFeedId) public onlyOwner {
        s_priceFeedId = _newPriceFeedId;
    }

    /// @dev Function for the owner to update the proposal address for a user.
    /// @param oldUserProposalAddress The old address of the user.
    /// @param newUserProposalAddress The new address of the user.
    function updateUserProposalAddress(
        address oldUserProposalAddress,
        address newUserProposalAddress
    ) public onlyOwner {
        uint256 userFunds = s_userBalances[oldUserProposalAddress];
        delete s_userBalances[oldUserProposalAddress];
        s_userBalances[newUserProposalAddress] = userFunds;

        bytes32 proposalHash = s_proposalHashes[oldUserProposalAddress];
        delete s_proposalHashes[oldUserProposalAddress];
        s_proposalHashes[newUserProposalAddress] = proposalHash;
    }

    /// @dev Function for the owner to update the proposal hash for a user.
    /// @param userProposalAddress The address of the user.
    /// @param newUserProposalHash The new proposal hash for the user.
    function updateUserProposalHash(
        address userProposalAddress,
        bytes32 newUserProposalHash
    ) public onlyOwner {
        s_proposalHashes[userProposalAddress] = newUserProposalHash;
    }

    /// @dev Function to return the base URI for metadata.
    /// @return The base URI string.
    function _baseURI() internal view virtual override returns (string memory) {
        return s_baseUri;
    }

    /// @dev Function to get the proposal hash of a user.
    /// @param proposalUserAddress The address of the user.
    /// @return The proposal hash of the user.
    function getUserProposalHash(address proposalUserAddress)
        public
        view
        returns (bytes32)
    {
        return s_proposalHashes[proposalUserAddress];
    }

    /// @dev Function to get the funds of a user.
    /// @param proposalUserAddress The address of the user.
    /// @return The amount of funds for the user.
    function getUserFunds(address proposalUserAddress)
        public
        view
        returns (uint256)
    {
        return s_userBalances[proposalUserAddress];
    }

    /// @dev Function to get the total funds in USD for a token ID.
    /// @param id The token ID.
    /// @return The total funds in USD for the token ID.
    function getTotalFundsInUSD(uint256 id)
        public
        view
        returns (uint256)
    {
        return s_totalFundedUSD[id];
    }

    /// @dev Function to check if the pool is active.
    /// @return True if the pool is active, false otherwise.
    function getIsPoolActive()
        public
        view
        returns (bool)
    {
        return s_isPoolActive;
    }

    /// @dev Function to calculate the scaled amount in Wei for 1 USD.
    /// @param price The PythStructs.Price struct containing the price data.
    /// @return oneDollarInWei The equivalent of 1 USD in Wei.
    function getScaledAmount(PythStructs.Price memory price)
        public
        pure
        returns (uint256 oneDollarInWei)
    {
        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) * (10**18)) /
            (10**uint8(uint32(-1 * price.expo)));
        oneDollarInWei = ((10**18) * (10**18)) / ethPrice18Decimals;
        return oneDollarInWei;
    }

    /// @dev Internal function to update the Pyth price feeds and calculate the scaled amount.
    /// @param priceUpdate Array of price update data from Pyth.
    /// @return oneDollarInWei The equivalent of 1 USD in Wei.
    function _updatePythPriceFeeds(bytes[] calldata priceUpdate)
        private
        returns (uint256 oneDollarInWei)
    {
        uint256 fee = s_pyth.getUpdateFee(priceUpdate);
        s_pyth.updatePriceFeeds{value: fee}(priceUpdate);
        PythStructs.Price memory price = s_pyth.getPrice(s_priceFeedId);

        if (block.timestamp - price.publishTime > s_pyth.getValidTimePeriod()) {
            revert SeedSphere__StalePrice();
        }

        uint256 ethPrice18Decimals = (uint256(uint64(price.price)) * (10**18)) /
            (10**uint8(uint32(-1 * price.expo)));
        oneDollarInWei = ((10**18) * (10**18)) / ethPrice18Decimals;
        return oneDollarInWei;
    }

    /// @dev Overridden withdraw function to disable funders from withdrawing funds.
    /// @param assets The amount of assets to withdraw.
    /// @param receiver The address to receive the withdrawn assets.
    /// @param owner The address of the token owner.
    /// @return id Always reverts with a custom error.
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public virtual override returns (uint256 id) {
        revert("SeedSphere Not Allow Funders to Withdraw!");
    }
}
