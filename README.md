# VoteDAPP

## Environments

The recommended operating systems for the dapp development is posix-like.

- ubuntu-18.04.1 AMD64
- npm 3.5.2 	

## Tools

### Vue-cli

The front-end parts of the dapp is based on vue.js.

```sh
cp app
npm run serve
```

### Truffle@~4.1.13

Truffle is a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. 

Please compile and deploy your smart contracts follow the steps below.

1. Config your test networks in truffle-config.js

2. run script in unix-like operating system (e.g. Mac OS, Linux)

```sh
./deploy-contract.sh
```

### Ganache cli v6.4.1

The Ganache is a Node.js Ethereum client for testing and developing smart contracts.
