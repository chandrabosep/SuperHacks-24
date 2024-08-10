// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721, ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IERC4626A} from "./IERC4626A.sol";

/**
 * @title ERC4626A
 * @dev ERC721 token standard extended with ERC4626-style asset management functionality.
 */
abstract contract ERC4626A is ERC721, IERC4626A {
    using Math for uint256;

    /// @dev The next token ID to be minted.
    uint256 private _currentIndex;

    /// @dev Mapping from owner address to token ID.
    mapping(address => uint256) private _ownedTokens;

    /// @dev Mapping from token ID to the total assets stored.
    mapping(uint256 => uint256) private _assetsByTokenId;

    /// @dev Thrown when attempting to deposit more assets than allowed for `receiver`.
    /// @param receiver The address of the receiver.
    /// @param assets The amount of assets attempted to deposit.
    /// @param max The maximum amount of assets allowed.
    error ExceededMaxDeposit(address receiver, uint256 assets, uint256 max);

    /// @dev Thrown when attempting to withdraw more assets than allowed for `owner`.
    /// @param owner The address of the owner.
    /// @param assets The amount of assets attempted to withdraw.
    /// @param max The maximum amount of assets allowed.
    error ExceededMaxWithdraw(address owner, uint256 assets, uint256 max);

    /// @dev Thrown when the caller is not authorized to perform the action.
    /// @param caller The address of the unauthorized caller.
    error Unauthorized(address caller);

    /// @dev Thrown when the withdrawal operation fails.
    error WithdrawFailed();

    /// @dev Thrown when the provided assets do not match `msg.value`.
    error AssetsDoNotMatchMsgValue();

    /// @dev Thrown when the owner has no tokens to withdraw or redeem.
    error NoTokensOwned();

    /// @dev Initializes the contract setting the initial `_currentIndex`.
    constructor(string memory name_, string memory symbol_)
        ERC721(name_, symbol_)
    {
        _currentIndex = _startId();
    }

    /// @dev Returns the asset address handled by this contract.
    /// This is a placeholder address for native ETH representation.
    /// @return The address representing the asset (ETH in this case).
    function asset() public view virtual returns (address) {
        return address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE); // Native ETH representation
    }

    /// @dev Returns the total assets managed by this contract.
    /// @return The total amount of assets (ETH) managed by the contract.
    function totalAssets() public view virtual returns (uint256) {
        return address(this).balance;
    }

    /// @dev Returns the maximum depositable amount for a given address.
    /// @return The maximum depositable amount (unlimited in this implementation).
    function maxDeposit(address) public view virtual returns (uint256) {
        return type(uint256).max;
    }

    /// @dev Returns the maximum withdrawable amount for a given owner.
    /// @param owner The address to check the maximum withdrawable amount for.
    /// @return The maximum amount of assets that can be withdrawn by the owner.
    function maxWithdraw(address owner) public view virtual returns (uint256) {
        uint256 id = _ownedTokens[owner];
        return _assetsByTokenId[id];
    }

    /// @dev Deposits `assets` to the contract on behalf of `receiver`.
    /// @param assets The amount of assets to deposit.
    /// @param receiver The address receiving the deposit.
    /// @return id The token ID associated with the deposit.
    function deposit(uint256 assets, address receiver)
        public
        payable
        virtual
        returns (uint256 id)
    {
        uint256 maxAssets = maxDeposit(receiver);
        if (assets > maxAssets)
            revert ExceededMaxDeposit(receiver, assets, maxAssets);

        if (assets != msg.value) revert AssetsDoNotMatchMsgValue();

        id = _ensureTokenId(receiver);
        _deposit(_msgSender(), receiver, assets, id);
    }

    /// @dev Withdraws `assets` to the `receiver` on behalf of `owner`.
    /// @param assets The amount of assets to withdraw.
    /// @param receiver The address receiving the withdrawn assets.
    /// @param owner The address of the token owner.
    /// @return id The token ID associated with the withdrawal.
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public virtual returns (uint256 id) {
        if (!_isTokenHolder(owner)) revert NoTokensOwned();
        uint256 maxAssets = maxWithdraw(owner);
        if (assets > maxAssets)
            revert ExceededMaxWithdraw(owner, assets, maxAssets);

        id = _getTokenIdByOwner(owner);
        if (!_isApprovedOrOwner(_msgSender(), id))
            revert Unauthorized(_msgSender());

        _withdraw(_msgSender(), receiver, owner, assets, id);
    }

    /// @dev Internal deposit logic.
    /// @param caller The address initiating the deposit.
    /// @param receiver The address receiving the deposit.
    /// @param assets The amount of assets deposited.
    /// @param id The token ID associated with the deposit.
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 id
    ) internal virtual {
        _assetsByTokenId[id] += assets;
        emit Deposit(caller, receiver, assets, id);
    }

    /// @dev Internal withdraw logic.
    /// @param caller The address initiating the withdrawal.
    /// @param receiver The address receiving the withdrawn assets.
    /// @param owner The address of the token owner.
    /// @param assets The amount of assets withdrawn.
    /// @param id The token ID associated with the withdrawal.
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 id
    ) internal virtual {
        _assetsByTokenId[id] -= assets;
        (bool success, ) = receiver.call{value: assets}("");
        if (!success) revert WithdrawFailed();

        emit Withdraw(caller, receiver, owner, assets, id);
    }

    /// @dev Assigns a new ID to a `receiver` or retrieves an existing one.
    /// @param receiver The address to assign or retrieve the token ID for.
    /// @return id The assigned or retrieved token ID.
    function _ensureTokenId(address receiver)
        internal
        virtual
        returns (uint256 id)
    {
        if (_isTokenHolder(receiver)) {
            id = _getTokenIdByOwner(receiver);
        } else {
            id = _currentIndex;
            _currentIndex = _currentIndex + 1;
            _ownedTokens[receiver] = id;
            _mint(receiver, id);
        }
        return id;
    }

    /// @dev Returns whether `spender` is allowed to manage `id`.
    /// @param spender The address attempting to interact with the token.
    /// @param id The ID of the token that `spender` is attempting to manage.
    /// @return bool True if `spender` is the owner or approved for the token, false otherwise.
    function _isApprovedOrOwner(address spender, uint256 id)
        internal
        view
        virtual
        returns (bool)
    {
        address owner = ownerOf(id); // Get the owner of the token
        return (spender == owner ||
            getApproved(id) == spender ||
            isApprovedForAll(owner, spender));
    }

    /// @dev Retrieves the ID of a given `owner`.
    /// @param owner The address to retrieve the token ID for.
    /// @return The token ID associated with the owner.
    function _getTokenIdByOwner(address owner) public view virtual returns (uint256) {
        return _ownedTokens[owner];
    }

    /// @dev Retrieves the total assets stored under a given token ID.
    /// @param id The token ID to retrieve the total assets for.
    /// @return The total amount of assets stored under the given token ID.
    function _getTotalAssetsByTokenId(uint256 id) public view virtual returns (uint256) {
        return _assetsByTokenId[id];
    }

    /// @dev Checks if the `caller` has a token ID assigned.
    /// @param caller The address to check for a token ID.
    /// @return bool True if the caller has a token ID assigned, false otherwise.
    function _isTokenHolder(address caller)
        public
        view
        virtual
        returns (bool)
    {
        return balanceOf(caller) != 0;
    }

    /// @dev Returns the starting token ID.
    /// @return The starting token ID.
    function _startId() internal view virtual returns (uint256) {
        return 0;
    }
}
