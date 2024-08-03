// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Seeds.sol";


contract MyVault is ERC4626, Ownable {
    bool public poolActive;
    address[] public addresses;
    uint256 public randomSeed;
    MyToken public rewardToken;

    constructor(IERC20 asset, MyToken _rewardToken, string memory name, string memory symbol) 
        ERC4626(asset) 
        ERC20(name, symbol) 
        Ownable(_msgSender())
    {
        poolActive = false;
        randomSeed = block.timestamp;
        rewardToken = _rewardToken;
    }

    function deposit(uint256 assets, address receiver) public override returns (uint256) {
        require(poolActive, "Pool is not active");
        uint256 shares = super.deposit(assets, receiver);
        addresses.push(receiver);
        return shares;
    }

    function pool(address[] calldata inputAddresses) external onlyOwner {
        require(poolActive, "Pool is not active");

        uint256 length = inputAddresses.length;
        require(length > 0, "Input addresses array is empty");

        randomSeed = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, randomSeed)));

        uint256 randomIndex = randomSeed % length;
        address selectedAddress = inputAddresses[randomIndex];

        // Mint tokens to the selected address
        rewardToken.mint(selectedAddress, 100 * 10 ** rewardToken.decimals()); // Mint 100 tokens as an example
    }

    function setPoolActive(bool _poolActive) external onlyOwner {
        poolActive = _poolActive;
    }
}
