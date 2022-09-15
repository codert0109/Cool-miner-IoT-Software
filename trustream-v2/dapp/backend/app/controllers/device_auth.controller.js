const { recoverPersonalSignature } = require('eth-sig-util')
const { isActive } = require('./device_data.controller')
const { CENTRAL_WALLET } = require('../config/db.config');
const { getRandomNounce, getRandomSessionID, nounce_length } = require('../utils'); 

const db = require('../models')
const Device_Auth = db.device_auth
const NFT_Auth = db.nft_auth;

// Core API Functions for Device_Auth

function verifySignature(address, nounce, signature) {
  try {
    const msg = nounce
    const recoveredAddr = recoverPersonalSignature({
      data: msg,
      sig: signature,
    })
    console.log(`recoveredAddr:${recoveredAddr},  expectAddr:${address}`)
    if (recoveredAddr.toLowerCase() === address.toLowerCase()) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return false
  }
  return false
}

function updateNounce(address, nounce, success_callback, error_callback) {
  Device_Auth.findOne({ where: { address: address } })
    .then((data) => {
      if (data === null || data.address !== address) {
        Device_Auth.create({
          address,
          nounce,
        })
          .then((data) => {
            success_callback()
          })
          .catch((err) => {
            error_callback()
          })
      } else {
        Device_Auth.update({ address, nounce }, { where: { id: data.id } })
          .then((data) => {
            success_callback()
          })
          .catch((err) => {
            error_callback()
          })
      }
    })
    .catch((err) => {
      error_callback()
    })
}

// RESTful APIs for Device_Auth
exports.getNounce = (req, res) => {
  //  console.log('address:', req.body.address);
  if (req.body.address === undefined) {
    res.send('Bad request')
    return
  }

  let nounce = getRandomNounce()

  updateNounce(
    req.body.address,
    nounce,
    function () {
      res.send({
        status: 'OK',
        nounce: nounce,
      })
    },
    function () {
      res.send({
        status: 'ERR',
      })
    },
  )
}

exports.verifyFunction = (address, signature, success_callback, fail_callback) => {
  if (address == undefined || signature == undefined) {
    fail_callback();
    return;
  }

  Device_Auth.findOne({ where : { address,  session_id : signature }})
    .then((data) => {
      if (data === null) {
        fail_callback();
      } else {
        success_callback();
      }
    })
    .catch((err) => {
      fail_callback();
    })
};

exports.verifyAdminFunction = (address, signature, success_callback, fail_callback) => {
  exports.verifyFunction(address, signature,
    function() {
      console.log('checking more', address, CENTRAL_WALLET.address);
      if (address == CENTRAL_WALLET.address) {
        success_callback();
      } else {
        fail_callback();
      }
    },
    function() {
      console.log('checking fail');
      fail_callback();
    });
};

// This should be nft_auth.controller, but keep it now.
// We will move in near future.
exports.verify = (req, res) => {
  console.log('verify', req.body.address, req.body.signature, req.body.nft_id);
  if (req.body.address === undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  if (req.body.signature === undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
  }

  if (req.body.nft_id === undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
  }

  const { address, signature, nft_id } = req.body;

  NFT_Auth.findOne({ where : { address,  session_id : signature, nft_id }})
    .then((data) => {
      if (data === null) {
        res.send({
          status : 'ERR',
          message : 'Invalid signature'
        })
      } else {
        res.send({
          status : 'OK',
          message : 'Signature is valid.'
        })
      }
    })
    .catch((err) => {
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    })
}

exports.login = (req, res) => {
  if (req.body.address === undefined) {
    res.send('Bad request')
    return
  }

  if (req.body.password === undefined) {
    res.send('Bad request')
    return
  }

  if (req.body.remove_flag === undefined) {
    req.body.remove_flag = false;
  }

  const { address, password, remove_flag } = req.body

  Device_Auth.findOne({ where: { address } })
    .then((data) => {
      if (data === null) {
        res.send({
          status: 'ERR',
          message: `${address} not exist in database.`,
        })
      } else {
        let nounce = data.nounce
        if (nounce === null || nounce == undefined) {
          res.send({
            status: 'ERR',
            message: `nounce is empty`,
          })
        } else if (nounce.length != nounce_length) {
          res.send({
            status: 'ERR',
            message: `nounce length is invalid`,
          })
        } else {
          // We need to check the message.
          if (verifySignature(address, nounce, password)) {
            const processNewSession = () => {
              // It is working now. Create random session id for that part.
              let sessionID = getRandomSessionID()
              Device_Auth.update(
                {
                  session_id: sessionID,
                  session_start: Date.now(),
                },
                { where: { id: data.id } },
              )
                .then((data) => {
                  res.send({
                    status: 'OK',
                    message: 'New Session Start!',
                    session: sessionID,
                  })
                })
                .catch((err) => {
                  res.send({
                    status: 'ERR',
                    message: 'Internal Server Error',
                    detail: 'Updating Session failed',
                  })
                })
            }

            const removeSession = () => {
              data.destroy()
                .then(() => {
                  res.send({
                    status: 'OK',
                    message: 'Session Removed',
                    session: sessionID,
                  })
                })
                .catch(() => {
                  res.send({
                    status: 'ERR',
                    message: 'Internal Server Error',
                    detail: 'Removing Session failed',
                  })
                });
            }
            
            if (remove_flag === false) {
              processNewSession();
            } else {
              removeSession();
            }
          } else {
            res.send({
              status: 'ERR',
              message: 'singature check failed',
            })
          }
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status: 'ERR',
        message: 'INTERNAL SERVER ERROR',
      })
    })
}
