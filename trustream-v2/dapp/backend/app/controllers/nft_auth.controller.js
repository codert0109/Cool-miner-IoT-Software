const db = require('../models')
const NFT_Auth = db.nft_auth
const { getRandomSessionID } = require('../utils')
const camera = require('./camera.controller')

// This is Kernel Function
// Before call this function, please check authentication.
// This fuction create new Session ID for corresponding NFT_ID.
function createNFTSession(
  address,
  nft_id,
  miner,
  success_callback,
  error_callback,
) {
  NFT_Auth.destroy({where : { nft_id }})
    .then(() => {
      let session_id = getRandomSessionID();
      let session_start = Date.now();
      NFT_Auth.create({ address, nft_id, miner, session_id, session_start })
        .then(() => {
          success_callback(session_id)
        })
        .catch((err) => {
          console.error('errors', err)
          error_callback()
        })
    })
    .catch((err) => {
      console.error('errors', err)
      error_callback()
    });
}

// This is Kernel Function.
// Before call this function, please check authentication.
// This function remove NFT_Session that NFT_ID assigned.
function removeNFTSession(address, nft_id, success_callback, error_callback) {
  NFT_Auth.findOne({ where: { address, nft_id } }) // nft_id & address is pair
    .then((data) => {
      if (data !== null) {
        data
          .destroy()
          .then(() => {
            success_callback()
          })
          .catch((err) => {
            console.error(err);
            error_callback()
          })
      } else {
        success_callback()
      }
    })
    .catch((err) => {
      console.error(err);
      error_callback()
    })
}

// RESTful API backends.
// Please add auth middleware before accessing this link.

exports.create = (req, res) => {
  const { address, nft_id, miner } = req.body
  if (address === undefined || nft_id === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  createNFTSession(
    address,
    nft_id,
    miner,
    async (nft_session) => {
      let freeCamera = await camera.findFreeCamera(nft_id)
      if (freeCamera == null) {
        res.send({
          status: 'ERR',
          message: 'No assignable camera yet.',
        })
        return
      }

      camera.assignNFTToCamera(
        {
          nft_id : nft_id,
          camera : freeCamera,
          isRemove : false
        },
        () => {
          res.send({
            status: 'success',
            message: 'New NFT Session start!',
            session: nft_session,
            camera: freeCamera,
          })
        },
        (err) => {
          res.send({
            status: 'ERR',
            message: 'Bad request',
            error: err,
          })
        },
      )
    },
    () => {
      res.send({
        status: 'ERR',
        message: 'Bad request',
      })
    },
  )
}

exports.remove = (req, res) => {
  const { address, nft_id } = req.body
  if (address === undefined || nft_id === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  removeNFTSession(
    address,
    nft_id,
    () => {
      res.send({
        status: 'success',
        message: 'NFT Session removed!',
      })
    },
    () => {
      res.send({
        status: 'ERR',
        message: 'Bad request',
      })
    },
  )
}

exports.getStatus = (req, res) => {
  let address = req.get('address')
  let nft_id = req.body.nft_id

  if (address === undefined || nft_id === undefined) {
    res.send('Bad request')
    return
  }

  NFT_Auth.findOne({ where: { address, nft_id } })
    .then((data) => {
      if (data === null) {
        res.send({
          status: 'OK',
          data: {
            nft_id,
            miner: 'Not set',
            session: null,
          },
        })
      } else {
        res.send({
          status: 'OK',
          data: {
            nft_id,
            miner: data.miner,
            session: getRandomSessionID()
          },
        })
      }
    })
    .catch((err) => {
      console.error(err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

exports.verifySignature = (req, res) => {
  if (req.body.signature === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  const { signature } = req.body

  NFT_Auth.findOne({ where: { session_id: signature } })
    .then((data) => {
      if (data === null) {
        res.send({
          status: 'ERR',
          message: 'Signature is invalid.',
        })
      } else {
        res.send({
          status: 'OK',
          message: 'Signature is valid.',
        })
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

exports.verify = (req, res) => {
  if (req.body.address === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  if (req.body.signature === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return;
  }

  if (req.body.nft_id === undefined) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return;
  }

  if (req.body.error == undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
    return;
  }

  const { address, signature, nft_id, error } = req.body;
  
  NFT_Auth.findOne({ where: { address, session_id: signature, nft_id } })
    .then((data) => {
      if (data === null) {
        res.send({
          status: 'ERR',
          message: 'Invalid signature',
        })
      } else {
        camera.findFreeCamera(nft_id)
          .then((data) => {
            // we should remove that record.
            let isRemove = false;
            if (data.assigned == true && error == 'yes') {
              isRemove = true;
            }
            if (isRemove == false) {
              camera.assignNFTToCamera(
                {
                  nft_id : nft_id,
                  camera : data,
                  isRemove : isRemove
                },
                () => {
                  res.send({
                    status: 'OK',
                    message: 'Signature is valid.',
                    link : data.link,
                    location_id : 'P' + (data.tableid + 1) + data.id
                  })
                },
                () => {
                  res.send({
                    status: 'ERR',
                    message: 'Invalid signature',
                  })
                });
            } else {
              camera.findFreeNextCamera({ nft_id, camera : data, isRemove : true})
                .then((data) => {
                  camera.assignNFTToCamera(
                    {
                      nft_id : nft_id,
                      camera : data,
                      isRemove : false
                    },
                    () => {
                      res.send({
                        status: 'OK',
                        message: 'Signature is valid.',
                        link : data.link,
                        location_id : 'P' + (data.tableid + 1) + data.id
                      })
                    },
                    () => {
                      res.send({
                        status: 'ERR',
                        message: 'Invalid signature',
                      })
                    });
                })
                .catch((err) => {
                  console.error('error', err);
                  res.send({
                    status: 'ERR',
                    message: 'Errors occured',
                  })
                });
            } 
          })
          .catch((err) => {
            console.error('error', err);
            res.send({
              status: 'ERR',
              message: 'Invalid signature',
            })
          }) 
      }
    })
    .catch((err) => {
      console.error('error', err);
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

exports.createNFTSession = createNFTSession
exports.removeNFTSession = removeNFTSession
