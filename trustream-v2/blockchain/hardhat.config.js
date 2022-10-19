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

      const receipt = await tx;
      await receipt.wait();

      console.log(`Setting Success!`)
    } catch (err) {
      console.log('Errors occured in setMaxNFT', err)
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
