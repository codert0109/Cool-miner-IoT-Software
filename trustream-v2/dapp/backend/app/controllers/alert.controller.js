const db = require('../models')
const Alert = db.alert;

const claim_token = require('../controllers/claim_token.controller');
const device_data = require('../controllers/device_data.controller');

// Core API of Alert
exports.getEvent = async ({address}) => {
  return await Alert.findAll( { where : { address }});
};

exports.createEvent = async ({address, nft_id, type, level}) => {
  return await Alert.create({ address, nft_id, type, level });
};

exports.removeEvent = async ({address, nft_id, type}) => {
  return await Alert.destroy({ where : { address, nft_id, type }});
};

exports.updateEvent = async ({ address, nft_id, type, level }) => {
  return await Alert.update({ address, nft_id, type, level}, { where : { address, nft_id, type }});
};

// Restful Alert API
exports.getAlert = async (req, res) => {
  const { address } = req.body;

  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
    return;
  }

  let nftLists = await claim_token.getNFTCnt(address);
  let uploadTimes = await device_data.getLastUploadTime(address, nftLists);

  uploadTimes = uploadTimes.map(item => item ? item.upload_time : 0);
  uploadTimes = uploadTimes.map(item => Date.now() - item);

  const getAlertLevel = (timePassed) => {
    const levelThreshold = [3600, 3600 * 24, 3600 * 24 * 7];
    for (let i = levelThreshold.length - 1; i >= 0; i--) {
        if (levelThreshold[i] * 1000 <= timePassed)
            return i;
    }
    return -1;
  };

  for (let i = 0; i < uploadTimes.length; i++) {
    let nft_id = nftLists[i];
    let level = getAlertLevel(uploadTimes[i]);
    if (level == -1) continue;
    if (uploadTimes[i] == 0) {
      res.send({
        status : 'OK',
        message : `Your NFT ${nft_id} did not start mining yet.`
      });
      return;
    } else {
      let levelCaption = ['1 hour', '1 day', '1 week']
      res.send({
        status : 'OK',
        message : `Your NFT ${nft_id} has been offline for ${levelCaption[level]}.`,
      })
      return;
    }
  }

  res.send({
    status : 'OK',
    message : 'No Alert'
  });
};