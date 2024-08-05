// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

import {IPyth} from "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import {PythStructs} from "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";
import {PythUtils} from "@pythnetwork/pyth-sdk-solidity/PythUtils.sol";

// import "./ERC4626A.sol";

contract SeedSphere is ERC1155, ERC1155Supply, Ownable {
    bytes32 s_priceFeedId =
        0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
    uint256 private s_currentTokenId;

    mapping(address => uint256) private s_userId;
    mapping(address => uint256) public s_userFunds;
    bool public s_poolActive;

    IPyth pyth;

    constructor(address pythContract) ERC1155("") Ownable(_msgSender()) {
        pyth = IPyth(pythContract);
        s_poolActive = false;
    }

    function setBaseURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPoolActive(bool _poolActive) external onlyOwner {
        s_poolActive = _poolActive;
    }

    function fund(address userAddress, bytes[] calldata priceUpdate)
        public
        payable
        virtual
    {
        uint256 fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{value: fee}(priceUpdate);
        PythStructs.Price memory currentPrice = pyth.getPrice(s_priceFeedId);

        uint256 basePrice = PythUtils.convertToUint(
            currentPrice.price,
            currentPrice.expo,
            18
        );
    }

    // function

    // function fundBatch()

    // function poolDeposit(uint256 assets, address receiver)
    //     public
    //     payable
    //     virtual
    //     returns (uint256)
    // {
    // }

    function exampleMethod(bytes[] calldata priceUpdate) public payable {
        // Submit a priceUpdate to the Pyth contract to update the on-chain price.
        // Updating the price requires paying the fee returned by getUpdateFee.
        // WARNING: These lines are required to ensure the getPrice call below succeeds. If you remove them, transactions may fail with "0x19abf40e" error.
        uint256 fee = pyth.getUpdateFee(priceUpdate);
        pyth.updatePriceFeeds{value: fee}(priceUpdate);

        // Read the current price from a price feed.
        // Each price feed (e.g., ETH/USD) is identified by a price feed ID.
        // The complete list of feed IDs is available at https://pyth.network/developers/price-feed-ids
        bytes32 priceFeedId = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace; // ETH/USD
        PythStructs.Price memory price = pyth.getPrice(priceFeedId);
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for a given token ID.
     * This function overrides the `uri` function in ERC1155URIStorage to provide URI for a specific token ID.
     * @param tokenId The token ID for which to retrieve the URI.
     * @return A string representing the URI for the given token ID.
     */
    function uri(uint256 tokenId)
        public
        view
        virtual
        override(ERC1155)
        returns (string memory)
    {
        // If tokenId exists, concatenate base URI and tokenId (via string.concat).
        return string.concat(super.uri(tokenId), Strings.toString(tokenId));
        // return exists(tokenId) ? string.concat(super.uri(tokenId), Strings.toString(tokenId)) : super.uri(tokenId);
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
