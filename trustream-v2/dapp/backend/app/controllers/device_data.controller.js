const db = require("../models");
const Device_Data = db.device_datas;
const Op = db.Sequelize.Op;
const MINER_CONFIG = require('../config/miner.config');
const env = require('../config/env');

// Core API Functions for Device_Data

exports.checkActive = ({address, nft_id, callback}) => {
  Device_Data.findOne({ where : { address, nft_id }, order: [['upload_time', 'DESC']]})
    .then((data) => {
      if (data === null)
        callback(false);
      else {
        if (Date.now() - new Date(data.upload_time) < MINER_CONFIG.MINEDATA_TIME_OUT * 1000) {
          callback(true);
        } else {
          callback(false);
        }
      }
    })
    .catch((err) => {
      console.error(err);
      callback(false);
    });
};

exports.getLastUploadTime = async (address, nftList) => {
  let promiseList = [];

  nftList.forEach((nft_id) => {
    promiseList.push(Device_Data.findOne({ where : { address, nft_id }, order: [['upload_time', 'DESC']]}));
  });
  
  try {
    let data = await Promise.all(promiseList)
    return data;
  } catch (err) {
    return null;
  }
};

// Code function to return number of active miner.
exports.getActiveMinerCnt = async (address) => {
  try {
    let data;
    if (address != null) {
      data = await db.sequelize.query(`SELECT COUNT(DISTINCT(NFT_ID)) AS "CNT" FROM ${env.project}."device_data" AS "device_data" WHERE "device_data"."upload_time" > NOW() - INTERVAL '1 hour' AND "device_data"."address" = '${address}'`);
    } else {
      data = await db.sequelize.query(`SELECT COUNT(DISTINCT(NFT_ID)) AS "CNT" FROM ${env.project}."device_data" AS "device_data" WHERE "device_data"."upload_time" > NOW() - INTERVAL '1 hour'`);
    }
    return parseInt(data[0][0].CNT);
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const getActiveMiner = (address, callback) => {
  db.sequelize.query(`SELECT COUNT(DISTINCT(NFT_ID)) AS "CNT" FROM ${env.project}."device_data" AS "device_data" WHERE "device_data"."upload_time" > NOW() - INTERVAL '1 hour' AND "device_data"."address" = '${address}'`)
    .then((data) => {
      callback(data[0][0], true);
    })
    .catch((err) => {
      console.error(err);
      callback(err, false)
    });
};

// RESTful APIs for Device_Data

// Retrieve all Tutorials from the database.

exports.getTotActiveMinerCnt = async (req, res) => {
  try {
    let cnt = await exports.getActiveMinerCnt();
    res.send({
      status : 'OK',
      count : cnt,
      message : 'Success!'
    });
  } catch (err) {
    res.send({
      status : 'ERR',
      count : 0,
      message : 'Internal Server Error'
    });
  }
};

exports.getActiveMiner = (req, res) => {
  const { address } = req.body;
  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    })
  } else {
    getActiveMiner(address, function(data, flg) {
      if (flg == false) {
        res.send({
          status : 'ERR',
          message : 'Bad request',
          error : data
        })
        return;
      }
      res.send({
        status : 'OK',
        data
      })
    });
  }
};

exports.getInactivePeriod = (req, res) => {
  const { address, nft_id } = req.body;

  if (address == null || nft_id == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  
};

exports.isActive = (req, res) => {
  let address = req.query.address;
  let nft_id = req.query.nft_id;

  if (address == null || nft_id == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  exports.checkActive({address, nft_id, callback : function(active) {
    res.send({
      status : 'SUCCESS',
      active,
      address,
      nft_id
    })
  }});
}

exports.findAll = (req, res) => {
  let offset = req.query.offset;
  let limit = req.query.limit;

  // Validation of Limit
  if (limit == null) limit = 100;
  limit = parseInt(limit);
  if (limit > 100) limit = 100;

  // Validation of Offset
  if (offset == null) offset = 0;
  offset = parseInt(offset);
  if (offset < 0) offset = 0;

  Device_Data.count()
    .then(cnt => {
      Device_Data.findAll({offset, limit, order: [['upload_time', 'DESC']]})
        .then(data => {
          res.send({
            offset,
            cnt : limit,
            totcnt : cnt,
            data
          });
        })
        .catch(err => {
          console.error(err);
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving device_datas."
          });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting device_datas."
      });
    })
};

exports.clean = (req, res) => {
  Device_Data.findAll({
    attributes : ["address"],
    group : "address"
  }).then(async (data) => {
    let removeIDs = [];
    for (let i = 0; i < data.length; i++) {
      let alldata = await Device_Data.findAll( 
        { 
          attributes : ["start_time", "id"],
          where : { 
            address : data[i].address 
          },
          order: [['start_time', 'ASC']]
        }
      );

      console.log('receive data', alldata.length, data[i].address);
      let n = alldata.length;
      let last_start_time = 0;
      for (let j = 0; j < n; j++) {
        if (alldata[j].start_time - last_start_time < 2) {
          removeIDs.push(alldata[j].id);
        } else {
          last_start_time = alldata[j].start_time;
        }
      }
    }

    await Device_Data.destroy({ where: { id: removeIDs }})

    res.send({
      status : 'OK',
      solved : removeIDs.length
    });

  }).catch((err) => {
    console.error(err);
    res.send({
      status : 'ERR',
      message : 'Internal Server Error'
    })
  })
};