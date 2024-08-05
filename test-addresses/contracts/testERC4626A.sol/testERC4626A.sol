// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {IERC4626A} from "./IERC4626A.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

/**
 * @dev Attempted to deposit more assets than the max amount for `receiver`.
 */
error ERC4626AExceededMaxDeposit(address receiver, uint256 assets, uint256 max);

/**
 * @dev Attempted to mint more shares than the max amount for `receiver`.
 */
error ERC4626AExceededMaxMint(address receiver, uint256 shares, uint256 max);

/**
 * @dev Attempted to withdraw more assets than the max amount for `receiver`.
 */
error ERC4626AExceededMaxWithdraw(address owner, uint256 assets, uint256 max);

/**
 * @dev Attempted to redeem more shares than the max amount for `receiver`.
 */
error ERC4626AExceededMaxRedeem(address owner, uint256 shares, uint256 max);

contract ERC4626A is ERC1155, IERC4626A {

    IPyth pyth;

    mapping(address=>uint256) public s_userShares;

    constructor(address pythContract) {
    pyth = IPyth(pythContract);
  }

    /**
     * @dev See {IERC4626A-asset}.
     */
    function asset() public view virtual returns (address) {
        return address(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    }

    /**
     * @dev See {IERC4626A-totalAssets}.
     */
    function totalAssets() public view virtual returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev See {IERC4626A-convertToShares}.
     */
    function convertToShares(uint256 assets)
        public
        view
        virtual
        returns (uint256)
    {
        return _convertToShares(assets, Math.Rounding.Floor);
    }

    /**
     * @dev See {IERC4626A-maxDeposit}.
     */
    function maxDeposit(address) public view virtual returns (uint256) {
        return type(uint256).max;
    }

    /**
     * @dev See {IERC4626A-maxMint}.
     */
    function maxMint(address) public view virtual returns (uint256) {
        return type(uint256).max;
    }

    /**
     * @dev See {IERC4626A-maxWithdraw}.
     */
    function maxWithdraw(address owner) public view virtual returns (uint256) {
        return _convertToAssets(balanceOf(owner), Math.Rounding.Floor);
    }

    /**
     * @dev See {IERC4626A-maxRedeem}.
     */
    function maxRedeem(address owner) public view virtual returns (uint256) {
        return balanceOf(owner);
    }

    /**
     * @dev See {IERC4626A-previewDeposit}.
     */
    function previewDeposit(uint256 assets)
        public
        view
        virtual
        returns (uint256)
    {
        return _convertToShares(assets, Math.Rounding.Floor);
    }

    /**
     * @dev See {IERC4626A-previewMint}.
     */
    function previewMint(uint256 shares) public view virtual returns (uint256) {
        return _convertToAssets(shares, Math.Rounding.Ceil);
    }

    /**
     * @dev See {IERC4626A-previewWithdraw}.
     */
    function previewWithdraw(uint256 assets)
        public
        view
        virtual
        returns (uint256)
    {
        return _convertToShares(assets, Math.Rounding.Ceil);
    }

    /**
     * @dev See {IERC4626A-previewRedeem}.
     */
    function previewRedeem(uint256 shares)
        public
        view
        virtual
        returns (uint256)
    {
        return _convertToAssets(shares, Math.Rounding.Floor);
    }

    /**
     * @dev See {IERC4626A-deposit}.
     */
    function deposit(bytes[] calldata priceUpdate)
        public
        payable
        virtual
        returns (uint256)
    {
        uint256 maxAssets = maxDeposit(msg.sender);
        if (maxAssets < msg.value) {
            revert ERC4626AExceededMaxDeposit(receiver, assets, maxAssets);
        }

        uint256 shares = previewDeposit(assets);

        if (assets != msg.value) revert AssetsShouldBeEqualToMsgVaule();

        _deposit(_msgSender(), receiver, assets, shares);

        return shares;
    }

    /**
     * @dev See {IERC4626A-mint}.
     *
     * As opposed to {deposit}, minting is allowed even if the vault is in a state where the price of a share is zero.
     * In this case, the shares will be minted without requiring any assets to be deposited.
     */
    function mint(uint256 shares, address receiver)
        public
        payable
        virtual
        returns (uint256)
    {
        uint256 maxShares = maxMint(receiver);
        if (shares > maxShares) {
            revert ERC4626AExceededMaxMint(receiver, shares, maxShares);
        }

        uint256 assets = previewMint(shares);

        if (assets != msg.value) revert AssetsShouldBeEqualToMsgVaule();

        _deposit(_msgSender(), receiver, assets, shares);

        return assets;
    }

    /**
     * @dev See {IERC4626A-withdraw}.
     */
    function withdraw(
        uint256 assets,
        address receiver,
        address owner
    ) public virtual returns (uint256) {
        uint256 maxAssets = maxWithdraw(owner);
        if (assets > maxAssets) {
            revert ERC4626AExceededMaxWithdraw(owner, assets, maxAssets);
        }

        uint256 shares = previewWithdraw(assets);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return shares;
    }

    /**
     * @dev See {IERC4626A-redeem}.
     */
    function redeem(
        uint256 shares,
        address receiver,
        address owner
    ) public virtual returns (uint256) {
        uint256 maxShares = maxRedeem(owner);
        if (shares > maxShares) {
            revert ERC4626AExceededMaxRedeem(owner, shares, maxShares);
        }

        uint256 assets = previewRedeem(shares);
        _withdraw(_msgSender(), receiver, owner, assets, shares);

        return assets;
    }

    /**
     * @dev Internal conversion function (from assets to shares) with support for rounding direction.
     */
    function _convertToShares(uint256 assets, Math.Rounding rounding)
        internal
        view
        virtual
        returns (uint256)
    {
        return
            assets.mulDiv(
                totalSupply() + 10**_targetDecimals(),
                totalAssets() + 1,
                rounding
            );
    }

    /**
     * @dev Deposit/mint common workflow.
     */
    function _deposit(
        address caller,
        address receiver,
        uint256 assets,
        uint256 shares
    ) internal virtual {
        _mint(receiver, shares);

        emit Deposit(caller, receiver, assets, shares);
    }

    /**
     * @dev Withdraw/redeem common workflow.
     */
    function _withdraw(
        address caller,
        address receiver,
        address owner,
        uint256 assets,
        uint256 shares
    ) internal virtual {
        if (caller != owner) {
            _spendAllowance(owner, caller, shares);
        }

        _burn(owner, shares);
        (bool success, ) = receiver.call{value: assets}("");
        if (!success) revert WithdrawFailed();

        emit Withdraw(caller, receiver, owner, assets, shares);
    }

    function _targetDecimals() internal view virtual returns (uint8) {
        return 10**18;
    }
}
