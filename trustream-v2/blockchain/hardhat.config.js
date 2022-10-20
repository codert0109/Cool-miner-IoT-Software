require('@nomiclabs/hardhat-waffle')
require('@nomiclabs/hardhat-web3')
require('dotenv').config()

const config = require('./config/config')
const contractAddressList = config.contractAddress()

/**
 * Tasks to set Token Price.
 * Command: npx hardhat setTokenPrice --price {value} --network testnet
 * For example: npx hardhat setTokenPrice --price 0.1 --network testnet
 */
task('setTokenPrice', 'Set Token Price')
  .addParam('price', 'The token price by IoTex coin')
  .setAction(async (taskArgs) => {
    let price = taskArgs.price
    try {
      console.log(`Setting Token price to ${price} IoTex coin`)
      price = price * Math.pow(10, 18)
      const ElumTokenContract = await ethers.getContractFactory('ElumToken')
      const ElumToken = await ElumTokenContract.attach(
        contractAddressList.ElumToken,
      )
      await ElumToken.setTokenPrice(price.toString())
      console.log(`Setting Success!`)
    } catch (err) {
      console.log('Errors occured in setPrice', err)
    }
  })

/**
 * Tasks to set max nft count per wallet address.
 * Command: npx hardhat setMaxNFT --count {value} --network testnet
 * For example: npx hardhat setMaxNFT --count 1 --network testnet
 */
task('setMaxNFT', 'Set MAX NFT Per Wallet')
  .addParam('count', 'Set MAX NFT Per Wallet')
  .setAction(async (taskArgs) => {
    let count = taskArgs.count
    try {
      console.log(`Setting MAX NFT Per Wallet to ${count}`)
      const ElumNFTContract = await ethers.getContractFactory('ElumNFT')
      const ElumNFT = await ElumNFTContract.attach(contractAddressList.ElumNFT)

      //  const before_value = await ElumNFT.getMaxNFTPerWallet();
      //  console.log('Before', before_value);

      let tx = ElumNFT.setMaxNFTPerWallet(parseInt(count))

      const receipt = await tx
      await receipt.wait()

      console.log(`Setting Success!`)
    } catch (err) {
      console.log('Errors occured in setMaxNFT', err)
    }
  })

/**
 * Tasks to buy nft
 * Command: npx hardhat buyNFT --type {value} --amount {amount} --network testnet
 * For example: npx hardhat buyNFT --type 0 --amount 1 --network testnet
 */
task('buyNFT', 'Buy NFT')
  .addParam('type', 'NFT Type')
  .addParam('amount', 'NFT amount')
  .setAction(async (taskArgs) => {
    let type = taskArgs.type;
    let amount = taskArgs.amount;
    try {
      console.log(`Buy NFT type:${type} amount:${amount}`)
      const ElumNFTContract = await ethers.getContractFactory('ElumNFT')
      const ElumNFT = await ElumNFTContract.attach(contractAddressList.ElumNFT)

      let tx = ElumNFT.buyNFT(type, amount, { value : (BigInt(3) * BigInt(Math.pow(10, 18))).toString()})

      const receipt = await tx
      await receipt.wait()

      console.log(`Buy NFT Success!`)
    } catch (err) {
      console.log('Errors occured in buy NFT', err)
    }
  })

/**
 * Tasks to transfer nft
 * Command: npx hardhat transferNFT --to {address} --id {id} --network testnet
 * For example: npx hardhat buyNFT --to 0x78...192 --id 1 --network testnet
 */
 task('transferNFT', 'Transfer NFT')
 .addParam('to', 'Receiver Address')
 .addParam('id', 'NFT id')
 .setAction(async (taskArgs) => {
   let to = taskArgs.to;
   let id = taskArgs.id;
   try {
     console.log(`transferNFT to:${to} id:${id}`)
     const ElumNFTContract = await ethers.getContractFactory('ElumNFT')
     const ElumNFT = await ElumNFTContract.attach(contractAddressList.ElumNFT)

     let tx = ElumNFT.transferNFT([id], to)

     const receipt = await tx
     await receipt.wait()

     console.log(`Transfer NFT Success!`)
   } catch (err) {
     console.log('Errors occured in transfer NFT', err)
   }
 })

module.exports = {
  solidity: '0.8.4',
  networks: {
    testnet: {
      // These are the official IoTeX endpoints to be used by Ethereum clients
      // Testnet https://babel-api.testnet.iotex.io
      // Mainnet https://babel-api.mainnet.iotex.io
      url: `https://babel-api.testnet.iotex.io`,

      // Input your Metamask testnet account private key here
      accounts: [`${process.env.IOTEX_PRIVATE_KEY}`],
    },
  },
}
