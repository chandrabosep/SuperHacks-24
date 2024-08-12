# SeedSphere

A secure on-chain project funding platform utilizing the unique ERC4626A Vault standard, developed by the SeedSphere team.

# Contracts

1. Celo Alfajores: https://celo-alfajores.blockscout.com/address/0x8EDFFa01e86B1f039b6C168b7f8813169a662364
2. Optimism Sepolia: https://optimism-sepolia.blockscout.com/address/0xe00cAB2915c3eEEa10e3d6956239428D14cc8587
3. Base Sepolia: https://base-sepolia.blockscout.com/address/0xe00cAB2915c3eEEa10e3d6956239428D14cc8587
4. Mode Sepolia: https://sepolia.explorer.mode.network/address/0xe00cAB2915c3eEEa10e3d6956239428D14cc8587

Superchain Maxis uses Unique contract address: 0xe00cAB2915c3eEEa10e3d6956239428D14cc8587

### For Testing

Celo: https://celo-alfajores.blockscout.com/address/0xD66D6E1e09Bb6A54f45B906B56a2b93f2F42fe8a

Dango Deployment: Dango Deployment: Developed and deployed DangoVault with our new ERC4626A standard, contract verified using Blockscout - https://celo-dango.blockscout.com/address/0x5E36A22751f56aECE9A970beac728De684E7Bd1E

# Flow

1. overview: https://github.com/chandrabosep/SuperHacks-24/blob/mujahid/Overview.drawio.png
2. Basic Flow: https://github.com/chandrabosep/SuperHacks-24/blob/mujahid/Basic-Flow.png
3. Advanced Flow: https://github.com/chandrabosep/SuperHacks-24/blob/mujahid/SeedSphere-Flowchart.png

# Prize Integrations

1. OP Track: Leveraging multi-blockchain support for user and funder convenience. Features include a Grants Monitor Tool for voting, an Enhanced Dashboard, and a Single Proposal Submission for projects. Focused on the Superchain Maxis (Optimism, Base, Mode) ecosystems.
2. WorldID Track: Integration of user verification via WorldID to eliminate bots and scams, ensuring secure project submissions. Verified funders can participate in funding on Optimism and Base.
3. Base Track: Facilitating secure on-chain payments and funding on the Base network using ERC4626A Vault, ensuring trust and transparency in the funding process.
4. Celo Track: Premier on-chain funding DApp for projects on Celo, utilizing the ERC4626A Vault. Deployed on the Dango network for testing found an issue & shared via Feedback form.
5. Superform Track: Introduction of a new conformant vault system using ERC4626A, combining security with creative flexibility for on-chain funding.
6. Pyth Track: Innovative utilization of Pyth contracts and priceFeedIds to enable interoperability across multiple blockchains for secure and reliable funding processes.
7. Mode Track: Leading DeFi funding DApp tailored for projects on the Mode network, providing secure and efficient funding solutions.
8. Blockscout Track: All contracts are deployed and verified using Blockscout, ensuring transparency and reliability in the smart contract deployment process.

# Functions

1. fund(address[] calldata userAddresses, bytes[] calldata priceUpdate) - Distributes Native among multiple users and mints an ERC4626A token for the funder.
2. poolFunds(bytes[] calldata priceUpdate) - Contributes Native to a funding pool, doubling the contribution, and mints an ERC4626A token.
3. withdrawFunds() - Allows users to withdraw their allocated funds from the contract.
4. addOrUpdateProject(address proposalUserAddress, bytes32 proposalHash) - Adds or updates a project proposal for a specific user address.
5. endPool(address[] calldata userAddresses) - Ends the funding pool and distributes the pool funds among specified users.
6. setPoolActive(bool \_poolActive) - Activates or deactivates the funding pool.
7. activatePool() - Specifically activates the funding pool.
8. updatePythContract(address \_newPythContract) - Updates the Pyth contract address used for price feeds.
9. updatePriceFeed(bytes32 \_newPriceFeedId) - Updates the price feed ID for Native e.g. CELO/USD data.
10. updateUserProposalAddress(address oldUserProposalAddress, address newUserProposalAddress) - Transfers user funds and proposal data to a new address.
11. updateUserProposalHash(address userProposalAddress, bytes32 newUserProposalHash) - Updates the proposal hash for a specific user address.
12. \_baseURI() internal view virtual override returns (string memory) - Returns the base URI for ERC4626A token metadata.
13. getUserProposalHash(address proposalUserAddress) public view returns (bytes32) - Retrieves the proposal hash associated with a user address.
14. getUserFunds(address proposalUserAddress) public view returns (uint256) - Returns the balance of funds for a specific user address.
15. getTotalFundsInUSD(uint256 id) public view returns (uint256) - Gets the total USD value associated with a token ID.
16. getIsPoolActive() public view returns (bool) - Checks if the funding pool is currently active.
17. getPythContractAddress() public view returns (address) - Returns the current Pyth contract address.
18. getPriceFeedId() public view returns (bytes32) - Returns the price feed ID used for Native to USD conversions.
19. getScaledAmount(PythStructs.Price memory price) public pure returns (uint256 oneDollarInWei) - Calculates the equivalent of 1 USD in Wei.
20. \_updatePythPriceFeeds(bytes[] calldata priceUpdate) private returns (uint256 oneDollarInWei) - Updates Pyth price feeds and calculates 1 USD in Wei.
21. withdraw(uint256 assets, address receiver, address owner) public virtual override returns (uint256 id) - Disables funder withdrawals by always reverting.

# Resources

1. ERC7535: https://etherscan.io/address/0x6967D416A0Bd5d3F25F124e4B1763e20C4fA92E6#code
2. ERC4626A: https://www.rareskills.io/post/erc4626
3. ERC721A: https://github.com/chiru-labs/ERC721A
4. ERC1155A: https://github.com/superform-xyz/ERC1155A/blob/main/src/ERC1155A.sol

## Contracts & PriceFeedIds From Pyth

1. Celo Alfajores: 0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E
2. Optimism Sepolia: 0x0708325268dF9F66270F1401206434524814508b
3. Base Sepolia: 0xA2aa501b19aff244D90cc15a4Cf739D2725B5729
4. Mode Sepolia: 0xA2aa501b19aff244D90cc15a4Cf739D2725B5729

5. Celo Alfajores: 0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411
6. Optimism Sepolia: 0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf
7. Base Sepolia: 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
8. Mode Sepolia: 0x0386e113cc716a7c6a55decd97b19c90ce080d9f2f5255ac78a0e26889446d1e
