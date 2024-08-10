// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC721Metadata} from "@openzeppelin/contracts/interfaces/IERC721Metadata.sol";

/**
 * @title IERC4626A
 * @dev Interface for ERC4626A, extending ERC721 with ERC4626-style asset management functionality.
 */
interface IERC4626A is IERC721, IERC721Metadata {

    /// @dev Emitted when `caller` deposits `assets` for `receiver`.
    /// @param caller The address initiating the deposit.
    /// @param receiver The address receiving the deposit.
    /// @param assets The amount of assets deposited.
    /// @param id The token ID associated with the deposit.
    event Deposit(
        address indexed caller,
        address indexed receiver,
        uint256 assets,
        uint256 id
    );

    /// @dev Emitted when `caller` withdraws `assets` for `receiver` on behalf of `owner`.
    /// @param caller The address initiating the withdrawal.
    /// @param receiver The address receiving the withdrawn assets.
    /// @param owner The address of the token owner.
    /// @param assets The amount of assets withdrawn.
    /// @param id The token ID associated with the withdrawal.
    event Withdraw(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 assets,
        uint256 id
    );

    /**
     * @dev Returns the address of the underlying asset used by the contract.
     * @return The address representing the underlying asset.
     */
    function asset() external view returns (address);

    /**
     * @dev Returns the total amount of the underlying asset managed by the contract.
     * @return The total amount of assets managed by the contract.
     */
    function totalAssets() external view returns (uint256);

    /**
     * @dev Returns the maximum amount of assets that can be deposited for `receiver`.
     * @param receiver The address of the receiver.
     * @return The maximum depositable amount.
     */
    function maxDeposit(address receiver) external view returns (uint256);

    /**
     * @dev Deposits a specified amount of assets for a given receiver.
     * @param assets The amount of assets to deposit.
     * @param receiver The address receiving the deposit.
     * @return id The ID of the token associated with the deposit.
     */
    function deposit(uint256 assets, address receiver) external payable returns (uint256 id);

    /**
     * @dev Returns the maximum amount of assets that can be withdrawn by the owner.
     * @param owner The address of the token owner.
     * @return The maximum withdrawable amount.
     */
    function maxWithdraw(address owner) external view returns (uint256);

    /**
     * @dev Withdraws a specified amount of assets for a given receiver on behalf of the owner.
     * @param assets The amount of assets to withdraw.
     * @param receiver The address receiving the withdrawn assets.
     * @param owner The address of the token owner.
     * @return id The ID of the token associated with the withdrawal.
     */
    function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 id);
}
