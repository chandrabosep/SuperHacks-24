require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const pythContract = "0xA2aa501b19aff244D90cc15a4Cf739D2725B5729";
  const pricefeedId =
    "0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace";
  const newOwnerAddress = "0xA9ab8933Ff0467D51d13ea2bFECD81504Fc6f15a";

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
// yarn hardhat run scripts/baseDeploy.js --network baseSepolia
// Verify the contract with:
// yarn hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS
