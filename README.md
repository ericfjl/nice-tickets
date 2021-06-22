# nice-tickets
Use Openzeppelin develop a lottery with an upgradeable smart contract
## Quick start

The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/ericfjl/nice-tickets
cd nice-tickets
npm install
```

Once installed, let's run Hardhat's testing network. Of course you can config to run eric or other test network by edit the hardhat.config.js file:

```sh
npx hardhat node
```

Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy_upgradeable.js --network localhost  --show-stack-traces
```

React App of frontend :

```sh
cd frontend
npm install
npm start
```

Click [http://localhost:3000/](http://localhost:3000/) to show  Dapp. the first, [Metamask](https://metamask.io) must be installed and listening to
`localhost 8545`.
