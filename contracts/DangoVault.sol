// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC4626A, IERC4626A} from "./ERC4626A/ERC4626A.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DangoVault is ERC4626A, Ownable {

    constructor() ERC4626A("DangoVault","DVT") Ownable(_msgSender()){}

}
