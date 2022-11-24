const db = require('../models')
const Alert = db.alert;

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