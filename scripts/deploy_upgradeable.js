// scripts/deploy_upgradeable_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const NiceTickets = await ethers.getContractFactory("NiceTickets");
  console.log("Deploying NiceTickets...");
  const niceTickets = await upgrades.deployProxy(NiceTickets);
  await niceTickets.deployed();
  console.log("NiceTickets deployed to:", niceTickets.address);

  // We also save the contract's artifacts and address in the frontend directory
  saveFrontendFiles(niceTickets);
}


function saveFrontendFiles(niceTickets) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
  }

  fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ Token: niceTickets.address }, undefined, 2)
  );

  const TokenArtifact = artifacts.readArtifactSync("NiceTickets");

  fs.writeFileSync(
      contractsDir + "/NiceTickets.json",
      JSON.stringify(TokenArtifact, null, 2)
  );
}
main();