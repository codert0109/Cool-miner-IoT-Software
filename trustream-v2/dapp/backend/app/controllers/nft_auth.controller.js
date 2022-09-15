const db = require('../models')
const NFT_Auth = db.nft_auth;
const { getRandomSessionID } = require('../utils');

// This is Kernel Function
// Before call this function, please check authentication.
// This fuction create new Session ID for corresponding NFT_ID.
exports.createNFTSession = (address, nft_id, success_callback, error_callback) => {
  NFT_Auth.findOne( { where : { nft_id } } )
    .then((data) => {
      if (data === null) { // No data exist for that NFT_ID
        let session_id = getRandomSessionID();
        let session_start = Date.now();
        NFT_Auth.create( { nft_id, session_id, session_start })
          .the((data) => {
            success_callback(session_id);
          })
          .catch((err) => {
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
            error_callback();
          })
      }
    })
    .catch((err) => {
      error_callback();
    });
}

// This is Kernel Function.
// Before call this function, please check authentication.
// This function remove NFT_Session that NFT_ID assigned.
exports.removeNFTSession = (address, nft_id, success_callback, error_callback) => {
  NFT_Auth.remove({ where : { nft_id } })
    .then((data) => {
      success_callback();
    })
    .catch(() => {
      error_callback();
    })
}