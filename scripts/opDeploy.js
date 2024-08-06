require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const pythContract = "0x0708325268dF9F66270F1401206434524814508b";
  const pricefeedId =
    "0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf";
  const newOwnerAddress = "0x709d29dc073F42feF70B6aa751A8D186425b2750";

  const seedSphere = await hre.ethers.getContractFactory("SeedSphere");
  console.log("Deploying SeedSphere Contract...");

  const seedSphereContract = await seedSphere.deploy(
    pythContract,
    pricefeedId,
    {
      gasLimit: 3000000, // Adjusted to a more realistic gas limit
    }
  );

  await seedSphereContract.waitForDeployment();
  const seedSphereAddress = seedSphereContract.getAddress();
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
// yarn hardhat run scripts/deploy.js --network optimismSepolia
// Verify the contract with:
// yarn hardhat verify --network optimismSepolia DEPLOYED_CONTRACT_ADDRESS
