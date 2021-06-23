// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const NiceTicketsV2 = await ethers.getContractFactory("NiceTicketsV2");
  console.log("Upgrading NiceTickets..." + NiceTicketsV2);
  const niceTicketsV2 = await upgrades.upgradeProxy("0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e", NiceTicketsV2);
  console.log("NiceTicketsV2 upgraded:" + niceTicketsV2.address);
}

main();