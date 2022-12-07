const db = require('../models')
const claim = db.claim
const { updateUptimeInfo } = require('./device_uptime.controller');
const { updateValue, getValue } = require('./key_status.controller');

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
    console.error('errors occured', err);
    return null;
  }
};

exports.getNFTCnt = async (address) => {
  if (address == null)
    return 0;
  try {
    let tx = await ElumNFT.methods.balanceOf(address).call();
    return tx;
  } catch (err) {
    console.error('errors occured', err);
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

exports.updateClaimToken = async ({address, amount, uptime, nft_id, multiplier, epoch}) => {
  try {
    let data = await claim.findOne({ where : { address }})
    let prv_amount = BigInt(0);
    console.log('data exist', data != null);
    if (data != null) {
      prv_amount = BigInt(data.token);
      await claim.update( { address, token : (prv_amount + amount).toString()}, { where : { address } });
    } else {
      await claim.create( { address, token : amount.toString() });
    }
    
    await updateUptimeInfo({address, amount, uptime, nft_id, multiplier, epoch});

    return {
      status : 'OK',
      address,
      amount : prv_amount + amount
    };

  } catch (err) {
    console.error('errors occured', err);
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
      console.error('errors occured', err);
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

  let amount = BigInt(0);

  try {
    let data = await claim.findOne({ where : { address }})
    amount = data != null ? BigInt(data.token) : BigInt(0);
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
    amount : amount.toString()
  });
};

exports.getDistributeToken = async (req, res) => {
  getValue('TOKEN_PER_EPOCH')
    .then((data) => {
      res.send({
        status : 'OK',
        message : data
      })
    })
    .catch((err) => {
      console.error(err);
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    })
};

exports.updateDistributeToken = async (req, res) => {
  const { token } = req.body;
  if (token == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
    return;
  }
  updateValue('TOKEN_PER_EPOCH', token)
    .then(() => {
      res.send({
        status : 'OK',
        message : `TOKNE_PER_EPOCH updated as ${token}`
      })
    })
    .catch((err) => {
      console.error(err);
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    })
};

exports.get = async (req, res) => {
  if (CENTRAL_ACCOUNT.address != CENTRAL_WALLET.address) {
    res.send('INTERNAL SERVER ERROR')
  } else {
    const receiver = req.body.account

    const info = await getValue('CLAIMAMOUNT_FREE');
    const claim_value = info.value;

    const chainId = await web3.eth.net.getId()

    // Configure the transfer settings
    let txConfig = {
      from: CENTRAL_WALLET.address,
      to: receiver,
      // notice we use a slightly higher gas limit than Ethereum default
      // so we set it explicitely.
      gasPrice: '1000000000000',
      gas: '85000',
      value: claim_value, // Sending IoTx
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
        res.json({
          status : 'OK',
          message : 'Success',
          amount : claim_value
        })
        console.log(`Sending success! 10 IoTex coins to ${receiver}.`);
      })
      .on('error', function (e) {
        console.log(e)
        res.json({
          status : 'ERR',
          message : 'Failed',
          amount : claim_value
        })
      });
  }
}
