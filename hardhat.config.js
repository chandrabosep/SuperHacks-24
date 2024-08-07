/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const {
  API_URL_CELO_ALFAJORES,
  API_URL_OPTIMISM_SEPOLIA,
  API_URL_BASE_SEPOLIA,
  API_URL_MODE_SEPOLIA,
  BLOCKSCOUT_API_KEY,
  PRIVATE_KEY,
} = process.env;

module.exports = {
  solidity: "0.8.23",
  networks: {
    celoAlfajores: {
      url: API_URL_CELO_ALFAJORES,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 44787,
      timeout: 50000,
      confirmations: 2,
    },
    optimismSepolia: {
      url: API_URL_OPTIMISM_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 11155420,
      timeout: 50000,
      confirmations: 2,
    },
    baseSepolia: {
      url: API_URL_BASE_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 84532,
      timeout: 50000,
      confirmations: 2,
    },
    modeSepolia: {
      url: API_URL_MODE_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 84532,
      timeout: 50000,
      confirmations: 2,
    },
  },
  etherscan: {
    apiKey: BLOCKSCOUT_API_KEY,

    customChains: [
      {
        network: "celoAlfajores",
        chainId: 44787,
        urls: {
          apiURL: "https://celo-alfajores.blockscout.com/api",
          browserURL: "https://explorer.celo.org/alfajores/",
        },
      },
      {
        network: "optimismSepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://optimism-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        },
      },
      {
        network: "baseSepolia",
        chainId: 84532,
        urls: {
          apiURL: "https://base-sepolia.blockscout.com/api",
          browserURL: "https://base-sepolia.blockscout.com/",
        },
      },
      {
        network: "modeSepolia",
        chainId: 919,
        urls: {
          apiURL: "https://sepolia.explorer.mode.network/api",
          browserURL: "https://sepolia.explorer.mode.network/",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 1000,
    },
  },
};
