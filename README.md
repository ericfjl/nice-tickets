# nice-tickets
Use Openzeppelin develop a lottery with an upgradeable smart contract
## Quick start

### download && install
The first things you need to do are cloning this repository and installing its
dependencies:

```sh
git clone https://github.com/ericfjl/nice-tickets
cd nice-tickets
npm install
```

### start local node
Once installed, let's run Hardhat's testing network. Of course you can config to run eric or other test network by edit the hardhat.config.js file:
```sh
npx hardhat node
```
### contracts test
```shell script
npx hardhat test --network localhost
```
### deploy contracts
Then, on a new terminal, go to the repository's root folder and run this to
deploy your contract:

```sh
npx hardhat run scripts/deploy_upgradeable.js --network localhost  --show-stack-traces
Deploying NiceTickets...
NiceTickets deployed to: 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0

```

### start frontend (React App):

```sh
cd frontend
npm install
npm start
```

### dApp test
Click [http://localhost:3000/](http://localhost:3000/) to show dApp. the first, [Metamask](https://metamask.io) must be installed and listening to
`localhost 8545`.

### Troubleshooting
#### The err "Nonce too high. ..." occurred when use MetaMask to transaction
```html
err : Nonce too high. Expected nonce to be 0 but got 1. Note that transactions can't be queued when automining.
operating steps : Web MetaMask > Settings > Advanced > Reset Account.
```
#### underlying network changed
```js
// err : Please connect Metamask to Localhost:8545
//operating steps : check the chainId: 31337 in hardhat.config.js and Dapp.js(const HARDHAT_NETWORK_ID = '31337') whether equal
```
#### npm start err(MacOS)
```shell script
npm start

> frontend@0.1.0 start
> react-scripts start

There might be a problem with the project dependency tree.
It is likely not a bug in Create React App, but something you need to fix locally.

The react-scripts package provided by Create React App requires a dependency:

  "webpack": "4.42.0"

Don't try to install it manually: your package manager does it automatically.
However, a different version of webpack was detected higher up in the tree:

  /Users/xxx/node_modules/webpack (version: 3.12.0) 
```
operating steps (.env 's path is project's root path): 
```shell script
echo SKIP_PREFLIGHT_CHECK=true >> .env
```
### demo dapp
```http request
http://159.138.104.81:3000
```
### references
- [hardhat](https://hardhat.org/getting-started/)
- [upgradeable](https://docs.openzeppelin.com/contracts/4.x/upgradeable)
- [hardhat-hackathon-boilerplate](https://github.com/nomiclabs/hardhat-hackathon-boilerplate)