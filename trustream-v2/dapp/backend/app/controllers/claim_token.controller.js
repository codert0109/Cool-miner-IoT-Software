const db = require('../models')
const claim = db.claim

const Web3 = require('web3');
const { CENTRAL_WALLET } = require('../config/db.config');

// Interact with the IoTeX testnet
const ENDPOINT= "https://babel-api.testnet.iotex.io";

// Instantiate the Web3 object
const web3 = new Web3(ENDPOINT);

const CENTRAL_ACCOUNT = web3.eth.accounts.privateKeyToAccount(
  CENTRAL_WALLET.privateKey,
);

const Contract_Address  = require('../contracts/contract-address.json');
const ElumNFTABI        = require('../contracts/ElumNFT.json');
const ElumTokenABI      = require('../contracts/ElumToken.json');
const ElumRewardABI     = require('../contracts/ElumReward.json');
const ElumStakingABI    = require('../contracts/ElumStaking.json');

const ElumStaking = new web3.eth.Contract(ElumStakingABI.abi, Contract_Address.ElumStaking);
const ElumNFT     = new web3.eth.Contract(ElumNFTABI.abi,     Contract_Address.ElumNFT);
const ElumToken   = new web3.eth.Contract(ElumTokenABI.abi,   Contract_Address.ElumToken);
const ElumReward  = new web3.eth.Contract(ElumRewardABI.abi,  Contract_Address.ElumReward);

exports.Contract = {
  ElumStaking,
  ElumNFT    ,
  ElumToken  ,
  ElumReward 
};

// Core API
exports.getStakingInfo = async (address) => {
  if (address == null) 
    return null;
  try {
    let tx = await ElumStaking.methods.ADDRESS_TO_INFO(address).call();
    return tx;
  } catch (err) {
    console.log('see error', err);
    return null;
  }
};

// This function update available claimed tokens.
// exports.getAvailableClaimAmount = async (req, res) => {
//   const { address } = req.body;
//   if (address == null) {
//     res.send({
//       status : 'ERR',
//       message : 'Bad request'
//     })
//     return;
//   }

//   try {
//     let tx = await ElumReward.methods.getMaxAvailableToken(req.body.address).call();
//     res.send({
//       status : 'OK',
//       amount : tx
//     })
//   } catch (err) {
//     console.log('see error', err);
//     res.send({
//       status : 'ERR',
//       message : 'Errors occured in processing request'
//     })
//   }
// };

// exports.getStakingAmount = async (req, res) => {
//   const { address } = req.body;

//   if (address == null) {
//     res.send({
//       status : 'ERR',
//       message : 'Bad request'
//     })
//     return;
//   }

//   try {
//     let tx = await ElumStaking.methods.ADDRESS_TO_INFO(req.body.address).call();
//     res.send({
//       status : 'OK',
//       tx
//     })
//   } catch (err) {
//     console.log('see error', err);
//     res.send({
//       status : 'ERR',
//       message : 'Errors occured in processing request'
//     })
//   }
// };

exports.updateClaimToken = async (address, amount) => {
  try {
    let data = await claim.findOne({ where : { address }})
    let prv_amount = 0;
    if (data != null) {
      prv_amount = ~~(data.token);
      await claim.update( { address, token : prv_amount + amount}, { where : { id : data.id } });
    } else {
      await claim.create( { address, token : amount });
    }
    
    return {
      status : 'OK',
      address,
      amount : prv_amount + amount
    };

  } catch (err) {

    return {
      status : 'ERR',
      address,
      amount : 0
    };
  }
};

// RESTful API Begin
exports.getInfo = async (req, res) => {
  const { address } = req.body;

  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
    return;
  }

  claim.findOne({ where : { address }})
    .then((data) => {
      let amount = data != null ? data.token : 0;
      res.send({
        status : 'OK',
        message : 'Success',
        amount,
        address
      })
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    })
};

exports.claimReward = async (req, res) => {
  const { address } = req.body;

  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  let amount = 0;

  try {
    let data = await claim.findOne({ where : { address }})
    amount = data != null ? data.token : 1000;
    amount = parseInt(amount);
  } catch (err) {
    console.log(err);
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  const message = address.substr(2).padStart(32 * 2, 0) + amount.toString(16).padStart(32 * 2, 0);
  const messageHex = Buffer.from(message, "hex");

  const hashedMessage = web3.utils.sha3(messageHex);

  const signature = web3.eth.accounts.sign(
    hashedMessage, 
    CENTRAL_WALLET.privateKey
  );

  res.send({
    status : 'OK',
    signature,
    message : 'Signature created!',
    address,
    amount
  });
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
