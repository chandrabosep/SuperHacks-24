require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const { task } = require("hardhat/config");
const {
  API_URL_SEPOLIA,
  API_URL_OPTIMISM_SEPOLIA,
  API_URL_BASE_SEPOLIA,
  API_URL_CELO_ALFAJORES,
  API_URL_MODE_SEPOLIA,
  PRIVATE_KEY,
} = process.env;

task(
  "account",
  "returns nonce and balance for specified address on multiple networks"
)
  .addParam("address", "The address to check")
  .setAction(async (taskArgs) => {
    const { address } = taskArgs;

    const web3Sepolia = createAlchemyWeb3(API_URL_SEPOLIA);
    const web3OptimismSepolia = createAlchemyWeb3(API_URL_OPTIMISM_SEPOLIA);
    const web3BaseSepolia = createAlchemyWeb3(API_URL_BASE_SEPOLIA);
    const web3CeloAlfajores = createAlchemyWeb3(API_URL_CELO_ALFAJORES);
    const web3ModeSepolia = createAlchemyWeb3(API_URL_MODE_SEPOLIA);

    const networkIDArr = [
      "Ethereum Sepolia:",
      "Optimism Sepolia:",
      "Base Sepolia:",
      "Celo Alfajores:",
      "Mode Sepolia:",
    ];
    const providerArr = [
      web3Sepolia,
      web3OptimismSepolia,
      web3BaseSepolia,
      web3CeloAlfajores,
      web3ModeSepolia,
    ];
    const resultArr = [];

    for (let i = 0; i < providerArr.length; i++) {
      const nonce = await providerArr[i].eth.getTransactionCount(
        address,
        "latest"
      );
      const balance = await providerArr[i].eth.getBalance(address);
      resultArr.push([
        networkIDArr[i],
        nonce,
        parseFloat(providerArr[i].utils.fromWei(balance, "ether")).toFixed(2) +
          " ETH",
      ]);
    }
    resultArr.unshift(["| NETWORK | NONCE | BALANCE |"]);
    console.log(resultArr);
  });

module.exports = {
  solidity: "0.8.23",
  networks: {
    hardhat: {},
    sepolia: {
      url: API_URL_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    optimismSepolia: {
      url: API_URL_OPTIMISM_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    baseSepolia: {
      url: API_URL_BASE_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    celoAlfajores: {
      url: API_URL_CELO_ALFAJORES,
      accounts: [`0x${PRIVATE_KEY}`],
    },
    modeSepolia: {
      url: API_URL_MODE_SEPOLIA,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};

// npx hardhat account --address 0x709d29dc073F42feF70B6aa751A8D186425b2750
