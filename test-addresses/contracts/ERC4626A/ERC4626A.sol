// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {IERC4626A} from "./IERC4626A.sol";

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

contract ERC4626A is ERC1155, ERC1155Supply {
    uint256 private _currentTokenId;

    mapping(address => uint256) private _userTokenIds;

    constructor() ERC1155("") {}

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
        uint256 tokenId = _userTokenIds[owner];
        return totalSupply[tokenId];
    }

    /**
     * @dev See {IERC4626A-maxRedeem}.
     */
    function maxRedeem(address owner) public view virtual returns (uint256) {
        uint256 tokenId = _userTokenIds[owner];
        return totalSupply[tokenId];
    }

    /**
     * @dev See {IERC4626A-deposit}.
     */
    function deposit(uint256 assets, address receiver) public payable virtual returns (uint256) {
        uint256 maxAssets = maxDeposit(receiver);
        if (assets > maxAssets) {
            revert ERC4626AExceededMaxDeposit(receiver, assets, maxAssets);
        }

        uint256 shares = previewDeposit(assets);

        if (assets != msg.value) revert("Assets should be equal to msg.value");

        uint256 tokenId = _userTokenIds[receiver];
        if (tokenId == 0) {
            _currentTokenId++;
            tokenId = _currentTokenId;
            _userTokenIds[receiver] = tokenId;
        }

        _mint(receiver, tokenId, shares, "");

        emit Deposit(msg.sender, receiver, assets, shares);

        return shares;
    }

    /**
     * @dev See {IERC4626A-mint}.
     *
     * As opposed to {deposit}, minting is allowed even if the vault is in a state where the price of a share is zero.
     * In this case, the shares will be minted without requiring any assets to be deposited.
     */
    function mint(uint256 shares, address receiver) public payable virtual returns (uint256) {
        uint256 maxShares = maxMint(receiver);
        if (shares > maxShares) {
            revert ERC4626AExceededMaxMint(receiver, shares, maxShares);
        }

        uint256 assets = previewMint(shares);

        if (assets != msg.value) revert("Assets should be equal to msg.value");

        uint256 tokenId = _userTokenIds[receiver];
        if (tokenId == 0) {
            _currentTokenId++;
            tokenId = _currentTokenId;
            _userTokenIds[receiver] = tokenId;
        }

        _mint(receiver, tokenId, shares, "");

        emit Deposit(msg.sender, receiver, assets, shares);

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
        uint256 tokenId = _userTokenIds[owner];
        uint256 maxAssets = maxWithdraw(owner);
        if (assets > maxAssets) {
            revert ERC4626AExceededMaxWithdraw(owner, assets, maxAssets);
        }

        uint256 shares = previewWithdraw(assets);

        _withdraw(msg.sender, receiver, owner, assets, shares, tokenId);

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
        uint256 tokenId = _userTokenIds[owner];
        uint256 maxShares = maxRedeem(owner);
        if (shares > maxShares) {
            revert ERC4626AExceededMaxRedeem(owner, shares, maxShares);
        }

        uint256 assets = previewRedeem(shares);
        _withdraw(msg.sender, receiver, owner, assets, shares, tokenId);

        return assets;
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
        uint256 tokenId = _userTokenIds[receiver];
        if (tokenId == 0) {
            _currentTokenId++;
            tokenId = _currentTokenId;
            _userTokenIds[receiver] = tokenId;
        }

        _mint(receiver, tokenId, shares, "");

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
        uint256 shares,
        uint256 tokenId
    ) internal virtual {
        if (caller != owner) {
            // implement allowance logic if needed
        }

        _burn(owner, tokenId, shares);

        (bool success, ) = receiver.call{value: assets}("");
        if (!success) revert("Withdraw failed");

        emit Withdraw(caller, receiver, owner, assets, shares);
    }

    function previewDeposit(uint256 assets) public view returns (uint256) {
        return assets;
    }

    function previewMint(uint256 shares) public view returns (uint256) {
        // implement your preview logic
        return shares;
    }

    function previewWithdraw(uint256 assets) public view returns (uint256) {
        // implement your preview logic
        return assets;
    }

    function previewRedeem(uint256 shares) public view returns (uint256) {
        // implement your preview logic
        return shares;
    }
    // default override functions.
    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }
}
