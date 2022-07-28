const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { CENTRAL_WALLET } = require('../config/db.config');

// Web3 - Accounts private keys
const privateKeys = [
    CENTRAL_WALLET.privateKey
];

// Interact with the IoTeX testnet
const ENDPOINT= "https://babel-api.testnet.iotex.io";
// Uncomment the line below to interact with the IoTeX mainnet
// const ENDPOINT= "https://babel-api.mainnet.iotex.io";

// Instantiate the accounts provider
const provider = new HDWalletProvider(privateKeys, ENDPOINT, 0, 1);

// Instantiate the Web3 object
const web3 = new Web3(provider);

exports.get = async (req, res) => {
  const CENTRAL_ACCOUNT = web3.eth.accounts.privateKeyToAccount(
    CENTRAL_WALLET.privateKey,
  )
  if (CENTRAL_ACCOUNT.address != CENTRAL_WALLET.address) {
    res.send('INTERNAL SERVER ERROR')
  } else {
    const receiver = req.body.account

    const chainId = await web3.eth.net.getId()

    // Get the accounts
    let accounts = await web3.eth.getAccounts()
    // console.log(`accounts: ${JSON.stringify(accounts)}`)

    // Configure the transfer settings
    let txConfig = {
      from: accounts[0],
      to: receiver,
      // notice we use a slightly higher gas limit than Ethereum default
      // so we set it explicitely.
      gasPrice: '1000000000000',
      gas: '85000',
      value: web3.utils.toWei('10', 'ether'), // Sending 0.01 IOTX
      // IoTeX also has a different Chain Id than the Etehreum networks
      // that's why queried it above
      chainId,
    }

    // Sign the tx
    let signedTx = await web3.eth.signTransaction(txConfig, accounts[0])
    // console.log('Raw signed Tx: ', signedTx.raw)

    // Calculate the expected Hash
    const txHash = await web3.utils.sha3(signedTx.raw)
    // console.log('Tx Hash (calculated): ', txHash)

    // Send the transaction
    web3.eth
      .sendSignedTransaction(signedTx.raw)
      .on('receipt', function (receipt) {
        res.send(`success`)
        console.log(`Sending success! 10 IoTex coins to ${receiver}.`);
      })
      .on('error', function (e) {
        console.log(e)
        res.send(`error`)
      })
  }
}
