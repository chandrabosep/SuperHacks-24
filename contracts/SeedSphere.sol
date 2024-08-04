// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ERC7535.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SeedSphere is ERC7535, Ownable {
    bool public s_poolActive;

    constructor() ERC20("RewardPoints", "RPT") Ownable(_msgSender()) {
        s_poolActive = false;
    }

    function setPoolActive(bool _poolActive) external onlyOwner {
        s_poolActive = _poolActive;
    }
}
