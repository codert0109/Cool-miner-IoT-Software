const { recoverPersonalSignature } = require('eth-sig-util')
const { isActive } = require('./device_data.controller')

const db = require('../models')
const Device_Auth = db.device_auth

// Core API Functions for Device_Auth

const nounce_length = 40

function randomString(length) {
  let chars = 'abcdefghijklmnopqrstuvwxyz'
  let ret = ''

  for (let i = 0; i < length; i++)
    ret += chars[~~(Math.random() * chars.length)]

  return ret
}

function getRandomNounce() {
  return randomString(nounce_length)
}

function getRandomSessionID() {
  return randomString(nounce_length)
}

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

exports.login = (req, res) => {
  if (req.body.address === undefined) {
    res.send('Bad request')
    return
  }

  if (req.body.password === undefined) {
    res.send('Bad request')
    return
  }

  const { address, password } = req.body

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
            
            processNewSession();
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
      res.send({
        status: 'ERR',
        message: 'INTERNAL SERVER ERROR',
      })
    })
}
