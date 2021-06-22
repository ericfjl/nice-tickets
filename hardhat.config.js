require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require("./tasks/faucet");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.6.9",
  defaultNetwork: "eric",
  networks: {
    hardhat: {
      //ToFixed: MetaMask chainId issue
      chainId: 31337
    },
    eric: {
      url: "http://localhost:8545",
      accounts: ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x8225eFd85635D24c23b0aA09CF3063A591c20995"]
    }
  },
};

