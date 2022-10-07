const Web3 = require('web3');
const { CENTRAL_WALLET } = require('../config/db.config');

// Interact with the IoTeX testnet
const ENDPOINT= "https://babel-api.testnet.iotex.io";

// Instantiate the Web3 object
const web3 = new Web3(ENDPOINT);

const CENTRAL_ACCOUNT = web3.eth.accounts.privateKeyToAccount(
  CENTRAL_WALLET.privateKey,
);

exports.claimReward = async (req, res) => {
  const message = "hello";
  const hashedMessage = web3.utils.sha3(message);
  console.log({ hashedMessage });

  const signature = web3.eth.accounts.sign(
    hashedMessage, 
    CENTRAL_WALLET.privateKey
  );

  res.send({
    status : 'OK',
    signature
  })
};

exports.get = async (req, res) => {
  if (CENTRAL_ACCOUNT.address != CENTRAL_WALLET.address) {
    res.send('INTERNAL SERVER ERROR')
  } else {
    const receiver = req.body.account

    const chainId = await web3.eth.net.getId()

    // Configure the transfer settings
    let txConfig = {
      from: CENTRAL_WALLET.address,
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

    const createTransaction = await web3.eth.accounts.signTransaction(
        txConfig,
        CENTRAL_WALLET.privateKey
    );

    web3.eth
      .sendSignedTransaction(createTransaction.rawTransaction)
      .on('receipt', function (receipt) {
        res.send(`success`)
        console.log(`Sending success! 10 IoTex coins to ${receiver}.`);
      })
      .on('error', function (e) {
        console.log(e)
        res.send(`error`)
      });
  }
}
