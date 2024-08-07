require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const pythContract = "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729";
  const pricefeedId =
    "0x0386e113cc716a7c6a55decd97b19c90ce080d9f2f5255ac78a0e26889446d1e";
  const newOwnerAddress = "0x709d29dc073F42feF70B6aa751A8D186425b2750";

  const seedSphere = await hre.ethers.getContractFactory("SeedSphere");
  console.log("Deploying SeedSphere Contract...");

  const seedSphereContract = await seedSphere.deploy(
    pythContract,
    pricefeedId,
    {
      gasLimit: 5000000,
    }
  );

  await seedSphereContract.waitForDeployment();
  const seedSphereAddress = await seedSphereContract.getAddress();
  console.log("SeedSphere Contract Address:", seedSphereAddress);
  console.log("----------------------------------------------------------");

  // Transfer Ownership
  // console.log("Transferring ownership...");

  // const seedSphereInstance = await seedSphere.attach(seedSphereAddress);
  // const transferTx = await seedSphereInstance.transferOwnership(
  //   newOwnerAddress
  // );
  // await transferTx.wait();
  console.log("Ownership transferred to:", newOwnerAddress);
  console.log("----------------------------------------------------------");

  // Verify SeedSphere Contract
  console.log("Verifying SeedSphere...");
  await run("verify:verify", {
    address: seedSphereAddress,
    constructorArguments: [pythContract, pricefeedId],
  });
  console.log("----------------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Run this script with:
// yarn hardhat run scripts/opDeploy.js --network modeSepolia
// Verify the contract with:
// yarn hardhat verify --network modeSepolia DEPLOYED_CONTRACT_ADDRESS
