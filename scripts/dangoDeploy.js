require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const dangoVault = await hre.ethers.getContractFactory("DangoVault");
  console.log("Deploying DangoVault Contract...");

  const dangoVaultContract = await dangoVault.deploy({
    gasLimit: 5000000,
  });

  await dangoVaultContract.waitForDeployment();
  const dangoVaultAddress = await dangoVaultContract.getAddress();
  console.log("DangoVault Contract Address:", dangoVaultAddress);
  console.log("----------------------------------------------------------");

  // Verify DangoVault Contract
  console.log("Verifying DangoVault...");
  await run("verify:verify", {
    address: dangoVaultAddress,
    constructorArguments: [],
  });
  console.log("----------------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Run this script with:
// yarn hardhat run scripts/dangoDeploy.js --network celoDango
// Verify the contract with:
// yarn hardhat verify --network celoDango DEPLOYED_CONTRACT_ADDRESS
