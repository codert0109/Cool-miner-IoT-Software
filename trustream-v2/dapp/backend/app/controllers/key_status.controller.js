const db = require('../models')
const device_data = require('./device_data.controller');
const key_status = db.key_status;

const getkeyList = [
  'CLAIM_SERVICE_STATUS',
  'TOTAL_CARS',
  'TOTAL_TRUCKS',
  'TOTAL_PEDESTRIANS',
  'TOTAL_BUSES',
  'TOTAL_EVENTS',
  'CLAIMAMOUNT_FREE',
  'TOKEN_PER_EPOCH'
];

const updatekeyList = [
  'CLAIMAMOUNT_FREE',
  'TOKEN_PER_EPOCH'
];

exports.syncValue = () => {
  device_data.getTotalEvents()
    .then((data) => {
      exports.updateValue('TOTAL_CARS',        data[0].dataValues.total_cars);
      exports.updateValue('TOTAL_TRUCKS',      data[0].dataValues.total_trucks);
      exports.updateValue('TOTAL_PEDESTRIANS', data[0].dataValues.total_pedestrians);
      exports.updateValue('TOTAL_BUSES',       data[0].dataValues.total_buses);
      exports.updateValue('TOTAL_EVENTS',      data[0].dataValues.total_events);
      exports.createValueIfNotExist('CLAIMAMOUNT_FREE', BigInt(Math.pow(10, 19))); // 10 IoTex
      exports.createValueIfNotExist('TOKEN_PER_EPOCH',  '1000000000000000000000'); // 1000 IoTex
    })
    .catch((err) => {
      console.error(err);
    })
};

exports.getValue = (key) => {
    return key_status.findOne({ where : { key }});
};

exports.updateValue = (key, value) => {
    return key_status.upsert({ key, value }, { where : { key }});
};

exports.createValueIfNotExist = (key, value) => {
  exports.getValue(key)
    .then((data) => {
      if (data == null)
        exports.updateValue(key, value);
    })
    .catch((err) => {
      console.error(err);      
    });
};

exports.getSettingList = async (req, res) => {
    res.send({
        status : 'OK',
        getkeyList
    })
};

exports.getServerSettingList = async (req, res) => {
  let { keyList } = req.body;

  if (keyList == undefined) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
    return;
  }

  let values = {};

  let promiseList = [];

  for (let i = 0; i < keyList.length; i++) {
    let key = keyList[i];
    if (getkeyList.indexOf(key) == -1) {
      console.log('bad request', key);
      res.send({
          status : 'ERR',
          message : 'Bad request'
      })
      return;
    }
    promiseList.push(exports.getValue(key));
  }

  Promise.all(promiseList)
    .then((data) => {
      for (let i = 0; i < data.length; i++) 
        values[keyList[i]] = data[i];
      res.send({
        status : 'OK',
        message : values
      })
    })
    .catch((err) => {
      console.error(err);
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      })
    });
};

exports.getServerSettings = async (req, res) => {
    const { key } = req.body;
  
    if (key == undefined) {
      res.send({
        status : 'ERR',
        message : 'Bad request'
      })
      return;
    }

    if (getkeyList.indexOf(key) == -1) {
      res.send({
          status : 'ERR',
          message : 'Bad request'
      })
      return;
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