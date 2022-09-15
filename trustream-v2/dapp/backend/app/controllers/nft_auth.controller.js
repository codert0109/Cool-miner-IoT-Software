const db = require('../models')
const NFT_Auth = db.nft_auth;
const { getRandomSessionID } = require('../utils');

// This is Kernel Function
// Before call this function, please check authentication.
// This fuction create new Session ID for corresponding NFT_ID.
function createNFTSession(address, nft_id, miner, success_callback, error_callback) {
  NFT_Auth.findOne( { where : { nft_id } } )
    .then((data) => {
      if (data === null) { // No data exist for that NFT_ID
        let session_id = getRandomSessionID();
        let session_start = Date.now();
        NFT_Auth.create( { address, nft_id, session_id, session_start })
          .then((data) => {
            success_callback(session_id);
          })
          .catch((err) => {
            console.log('errors', err);
            error_callback();
          });
      } else {
        let session_id = getRandomSessionID();
        let session_start = Date.now();
        NFT_Auth.update( { nft_id, session_id, session_start }, { where :  { id : data.id } })
          .then((data) => {
            success_callback(session_id);
          })
          .catch((err) => {
            console.log('errors', err);
            error_callback();
          })
      }
    })
    .catch((err) => {
      console.log('errors', err);
      error_callback();
    });
}

// This is Kernel Function.
// Before call this function, please check authentication.
// This function remove NFT_Session that NFT_ID assigned.
function removeNFTSession(address, nft_id, success_callback, error_callback) {
  NFT_Auth.findOne({ where : { nft_id } })
    .then((data) => {
      if (data !== null) {
        data.destroy()
          .then(() => {
            success_callback();
          })
          .catch(() => {
            error_callback();
          })
      } else {
        success_callback();
      }
    })
    .catch(() => {
      error_callback();
    })
}

// RESTful API backends.
// Please add auth middleware before accessing this link.

exports.create = (req, res) => {
  const {address, nft_id, miner} = req.body;
  if (address === undefined || nft_id === undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  createNFTSession(address, nft_id, miner,
    (nft_session) => {
      res.send({
        status : 'success',
        message : 'New NFT Session start!',
        session : nft_session
      })
    },
    () => {
      res.send({
        status : 'ERR',
        message : 'Bad request'
      });
    });
}

exports.remove = (req, res) => {
  const {address, nft_id} = req.body;
  if (address === undefined || nft_id === undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  removeNFTSession(address, nft_id,
    () => {
      res.send({
        status : 'success',
        message : 'NFT Session removed!'
      });
    },
    () => {
      res.send({
        status : 'ERR',
        message : 'Bad request'
      });
    });
}

exports.getStatus = (req, res) => {
  let address = req.get('address');
  let nft_id = req.body.nft_id;

  if (address === undefined || nft_id === undefined) {
    res.send('Bad request');
    return;
  }

  NFT_Auth.findOne( { where : { nft_id } })
    .then((data) => {
      if (data === null) {
        res.send({
          status : 'OK',
          data : {
            nft_id,
            miner : 'Not set',
            session : null
          }
        });
      } else {
        res.send({
          status : 'OK',
          data : {
            nft_id,
            miner : data.miner,
            session : getRandomSessionID()
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    });
}

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

exports.createNFTSession = createNFTSession;
exports.removeNFTSession = removeNFTSession;