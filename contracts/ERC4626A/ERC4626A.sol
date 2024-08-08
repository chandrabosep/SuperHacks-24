// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import {IERC721 ,ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {IERC4626A} from "./IERC4626A.sol";

/**
 */
abstract contract ERC4626A is ERC721,IERC4626A {
    using Math for uint256;

    mapping(address owner => uint256) private _ownedTokens;

    mapping(uint256 id=>uint256 amount) public _totalStored;
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
        uint256 id=_ownedTokens[owner];
        return _totalStored(owner);
    }


    /**
     * @dev See {IERC4626A-deposit}.
     */
    function deposit(uint256 assets, address receiver) public payable virtual{
        uint256 maxAssets = maxDeposit(receiver);
        if (assets > maxAssets) {
            revert ERC4626AExceededMaxDeposit(receiver, assets, maxAssets);
        }

        if (assets != msg.value) revert AssetsShouldBeEqualToMsgVaule();

        // Implement Minting Logic as per your Preference
        // Need Id to make changes
        // uint256 id= /* Token Id Logic */
        // _mint(receiver,id); -- For First time Deposit!

        // _deposit(_msgSender(), receiver, assets,id);


    }

    /**
     * @dev See {IERC4626A-withdraw}.
     */
    function withdraw(uint256 assets, address receiver, address owner) public virtual {
        uint256 maxAssets = maxWithdraw(owner);
        if (assets > maxAssets) {
            revert ERC4626AExceededMaxWithdraw(owner, assets, maxAssets);
        }

        // Implement Checks Logic as per your Preference
        // Need Id to make changes
        // uint256 id= /* Token Id Logic */
        // _burn(receiver,id); -- For Zero Deposits!

        // _withdraw(_msgSender(), receiver, owner, assets, id);
    }


    /**
     * @dev Deposit/mint common workflow.
     */
    function _deposit(address caller, address receiver, uint256 assets, uint256 id) internal virtual {

        _totalStored[id]+=assets;

        emit Deposit(caller, receiver, assets, shares);
    }

    /**
     * @dev Withdraw/redeem common workflow.
     */
    function _withdraw(address caller, address receiver, uint256 assets, uint256 id)
        internal
        virtual
    {
        _totalStored[id]-=assets;
        (bool success,) = receiver.call{value: assets}("");
        if (!success) revert WithdrawFailed();

        emit Withdraw(caller, receiver, owner, assets, shares);
    }
    function _getUserId(address to)
        internal
        virtual
        returns(uint256)
    {
        return _ownedTokens[to];
    }
}