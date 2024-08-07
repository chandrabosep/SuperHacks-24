require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const pythContract = "0x74f09cb3c7e2A01865f424FD14F6dc9A14E3e94E";
  const pricefeedId =
    "0x7d669ddcdd23d9ef1fa9a9cc022ba055ec900e91c4cb960f3c20429d4447a411";
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
// yarn hardhat run scripts/opDeploy.js --network celoAlfajores
// Verify the contract with:
// yarn hardhat verify --network celoAlfajores DEPLOYED_CONTRACT_ADDRESS
