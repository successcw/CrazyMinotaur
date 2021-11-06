
# Welcome to CrazyMinotaur

This is a small but complete implementation of NFT based on ERC-721. It only includes three tokens in total, but each of them have name, picture, attributes(strength/constitution/dexterity/intelligence/wisdom/charisma).  
Have fun!

## Structure

- [`contracts`](contracts): This implements CrazyMinotaur's contract base on ERC-721 with metadata supported.
- [`metadata`](metadata): This includes metadata json files which metadata server will return when required.
- [`migrations`](migrations): Truffle's migration file which is used to deploy contract to blockchain.
- [`pages`](pages): Home page, connect to Metamask and mint tokens.
- [`test`](test): Truffle test files.

## Requirements
The following are dependencies for running and developing CrazyMinotaur:

| Software | Notes |
|:---------|:------|
|[Go Ethereum](https://geth.ethereum.org/docs/install-and-build/installing-geth)|Ethereum Node|
|[Truffle](https://www.trufflesuite.com/docs/truffle/quickstart)|Development environment|
|[Ganache](https://www.trufflesuite.com/ganache)|A personal Ethereum blockchain|
|[mocha](https://mochajs.org/)|Feature-rich JavaScript test framework|
|[npm/Node.js](https://nodejs.org/en/)|JavaScript runtime|
|[yarn](https://yarnpkg.com/getting-started)|Package manager for your code|
|[Next.js](https://nextjs.org/docs)|React Framework|
|[Metamask](https://metamask.io)|Crypto Wallet|

## Installation

```Bash
#!/bin/sh
#
# Installation srcipt for NFT development environment

check_result() {

    if [ $? -ne 0 ]; then
        echo "Fail"
        exit 0
    else
        echo "Success"
    fi
}

echo -n "Install Node.js and npm..."
apt-get update > install.log 2>&1
export DEBIAN_FRONTEND=noninteractive
curl -fsSL https://deb.nodesource.com/setup_14.x | bash - >> install.log 2>&1
apt-get install -y nodejs >> install.log 2>&1
check_result

echo -n "Install yarn..."
apt-get install -y yarn >> install.log 2>&1
check_result

# Please delete this line if not in china.
npm config set registry http://registry.npm.taobao.org

echo -n "Install mocha..."
npm install --global mocha >> install.log 2>&1
check_result

echo -n "Install truffle..."
npm install truffle -g >> install.log 2>&1
check_result

echo -n "Install ganache-cli..."
npm install ganache-cli --global >> install.log 2>&1
check_result

echo -n "Install geth..."
apt-get install -y software-properties-common >> install.log 2>&1
apt-get update >> install.log 2>&1
add-apt-repository -y ppa:ethereum/ethereum >> install.log 2>&1
apt-get update >> install.log 2>&1
apt-get install -y ethereum >> install.log 2>&1
check_result

echo -n "Install Next.js..."
npm install next react react-dom >> install.log 2>&1
check_result
```


## Usage

### Smart contract
if you don't want to deploy your smart contract, you can use mine. please goto [Website](#Website) directly.

Compile
```Bash
truffle compile
```
Before deploy to ethereum testnet rinkeby, we need a gateway, I use local ethereum node by geth, it needs about 107G disk space till now(2021-11-06). You can also choose public node, e.g: [Alchemy](https://www.alchemy.com/)
```Bash
geth console --rinkeby --rpc --allow-insecure-unlock
```
If it's the first time to run geth, it needs about several hours to sync blockchain.  
create account, need do only once
```Bash
personal.newAccount()
```
you need gas to deploy smart contract, so please send eth to this account using metamask  
unlock account
```Bash
personal.unlockAccount("0x7A3244e8d5A4d0C087992633Ddc131270616c76a")
```
Deploy
```
truffle migrate --network rinkeby
```
When finished, you will get smart contract's address. Use it to replace 'ADDRESS' in ABI.js.  
Actually, before deploy to ethereum testnet rinkeby, it's better to deploy it to private blockchain - ganache and test it. please refer to [my blog](truffle) for more details

### Website
```
yarn dev
```
then open localhost:3000, everything is ok. Don't forget to install Metamask.
