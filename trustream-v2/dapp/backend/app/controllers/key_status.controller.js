const db = require('../models')
const key_status = db.key_status;

exports.getValue = (key) => {
    return key_status.findOne({ where : { key }});
};

exports.updateValue = (key, value) => {
    return key_status.upsert({ value }, { where : { key }});
};