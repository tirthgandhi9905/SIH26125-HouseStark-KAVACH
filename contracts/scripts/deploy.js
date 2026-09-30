const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the KavachIdentity contract
  const KavachIdentity = await hre.ethers.getContractFactory("KavachIdentity");
  const kavach = await KavachIdentity.deploy(deployer.address);

  await kavach.waitForDeployment();
  const address = await kavach.getAddress();

  console.log("KavachIdentity deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
