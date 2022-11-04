const db = require('../models')
const key_status = db.key_status;

const keyList = [
    'CLAIM_TOKEN_AMOUNT'
];

exports.getValue = (key) => {
    return key_status.findOne({ where : { key }});
};

exports.updateValue = (key, value) => {
    return key_status.upsert({ key, value }, { where : { key }});
};

exports.getSettingList = async (req, res) => {
    res.send({
        status : 'OK',
        keyList
    })
};

exports.getServerSettings = async (req, res) => {
    const { key } = req.body;
  
    if (key == undefined) {
      res.send({
        status : 'ERR',
        message : 'Bad request'
      })
    }

    if (keyList.indexOf(key) == -1) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
    }
  
    exports.getValue(key)
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


exports.updateServerSettings = async (req, res) => {
    const { key, value } = req.body;
  
    if (key == undefined || value == undefined) {
      res.send({
        status : 'ERR',
        message : 'Bad request'
      })
    }

    if (keyList.indexOf(key) == -1) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
    }
  
    exports.updateValue(key, value)
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