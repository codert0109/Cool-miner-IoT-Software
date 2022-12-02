const db = require('../models')
const key_status = db.key_status;

const getkeyList = [
  'CLAIM_SERVICE_STATUS'
];

const updatekeyList = [
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
        getkeyList
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

    if (getkeyList.indexOf(key) == -1) {
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

    if (updatekeyList.indexOf(key) == -1) {
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