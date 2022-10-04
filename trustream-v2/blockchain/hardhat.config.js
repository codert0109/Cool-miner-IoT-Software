require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-web3");
require('dotenv').config()

const config = require('./config/config');
const contractAddressList = config.contractAddress();

/**
 * Tasks to set Token Price.
 * Command: npx hardhat setTokenPrice --price {value} --network testnet
 * For example: npx hardhat setTokenPrice --price 0.1 --network testnet
 */
task("setTokenPrice", "Set Token Price")
  .addParam("price", "The token price by IoTex coin")
  .setAction(async (taskArgs) => {
    let price = taskArgs.price;
    try {
      console.log(`Setting Token price to ${price} IoTex coin`);
      price = price * Math.pow(10, 18);
      const ElumTokenContract = await ethers.getContractFactory("ElumToken");
      const ElumToken = await ElumTokenContract.attach(contractAddressList.ElumToken);
      await ElumToken.setTokenPrice(price.toString());
      console.log(`Setting Success!`);
    } catch (err) {
      console.log('Errors occured in setPrice', err);
    }
  });

module.exports = {
  solidity: "0.8.4",
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
};
