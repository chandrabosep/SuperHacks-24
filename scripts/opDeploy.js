require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
const { ethers, run } = require("hardhat");

async function main() {
  const pythContract = "0x0708325268dF9F66270F1401206434524814508b";
  const pricefeedId =
    "0x385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf";
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

  // Verify SeedSphere Contract on Sourcify
  // console.log("Verifying SeedSphere on Sourcify...");
  // try {
  //   await run("sourcify", {
  //     address: seedSphereAddress,
  //     source: {
  //       sources: {
  //         "contracts/SeedSphere.sol": {
  //           content: fs.readFileSync("contracts/SeedSphere.sol", "utf8"),
  //         },
  //         "@openzeppelin/contracts/access/Ownable.sol": {
  //           content: fs.readFileSync(
  //             "node_modules/@openzeppelin/contracts/access/Ownable.sol",
  //             "utf8"
  //           ),
  //         },
  //       },
  //     },
  //   });
  // } catch (error) {
  //   console.error("Error during Sourcify verification:", error);
  // }
  // console.log("----------------------------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Run this script with:
// yarn hardhat run scripts/opDeploy.js --network optimismSepolia
// Verify the contract with:
// yarn hardhat verify --network optimismSepolia DEPLOYED_CONTRACT_ADDRESS
