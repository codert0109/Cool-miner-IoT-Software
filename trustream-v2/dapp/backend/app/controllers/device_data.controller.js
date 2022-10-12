const db = require("../models");
const Device_Data = db.device_datas;
const Op = db.Sequelize.Op;
const MINER_CONFIG = require('../config/miner.config');

// Core API Functions for Device_Data

const checkActive = (address, callback) => {
  Device_Data.findOne({ where : { address }, order: [['start_time', 'DESC']]})
    .then((data) => {
      if (data === null)
        callback(false);
      else {
        if (Date.now() - new Date(data.start_time * 1000) > MINER_CONFIG.MINEDATA_TIME_OUT * 1000) {
          callback(false);
        } else {
          callback(true);
        }
      }
    })
    .catch((err) => {
      callback(false);
    });
};

// Code function to return number of active miner.
exports.getActiveMinerCnt = async (address) => {
  try {
    let data = await db.sequelize.query(`SELECT COUNT(DISTINCT(NFT_ID)) AS "CNT" FROM "testapp"."device_data" AS "device_data" WHERE "device_data"."upload_time" > NOW() - INTERVAL '1 hour' AND "device_data"."address" = '${address}'`);
    return parseInt(data[0][0].CNT);
  } catch (err) {
    return 0;
  }
};

const getActiveMiner = (address, callback) => {
  db.sequelize.query(`SELECT COUNT(DISTINCT(NFT_ID)) AS "CNT" FROM "testapp"."device_data" AS "device_data" WHERE "device_data"."upload_time" > NOW() - INTERVAL '1 hour' AND "device_data"."address" = '${address}'`)
    .then((data) => {
      callback(data[0][0], true);
    })
    .catch((err) => {
      callback(err, false)
    });
};

// RESTful APIs for Device_Data

// Retrieve all Tutorials from the database.

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

exports.isActive = (req, res) => {
  let address = req.query.address;
  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
    return;
  }

  checkActive(address, function(active) {
    res.send({
      status : 'SUCCESS',
      active,
      address
    })
  });
}

exports.getMinerName = (req, res) => {
  let address = req.query.address;
  if (address == null) {
    res.send({
      status : 'ERR',
      message : 'Bad request'
    });
  } else {
    Device_Data.findOne({ where : { address}, order: [['start_time', 'DESC']]})
    .then((data) => {
      if (data === null) {
        res.send({
          status : 'OK',
          miner : 'Not set'
        })
      } else {
        res.send({
          status : 'OK',
          miner : data.miner
        })
      }
    })
    .catch((err) => {
      res.send({
        status : 'ERR',
        message : 'Internal Server Error'
      });
    });
  }
}

// exports.getUploadCnt = (req, res) => {
//   // const { address, signature } = req.body;
//   const { address, startTime, endTime } = req.body;

//   if (address == null || startTime == null || endTime == null) {
//     res.send({
//       status : 'ERR',
//       message : 'Bad request'
//     });
//     return;
//   }

//   Device_Data.count(
//     { 
//       where : { 
//         address,
//         created_at : {
//           [Op.gt] : startTime,
//           [Op.lt] : endTime
//         }
//       }
//     })
//     .then(count => {
//       res.send({
//         status : 'SUCCESS',
//         count
//       })
//     })
//     .catch(err => {
//       res.send({
//         status : 'ERR',
//         message : 'Internal Server Error',
//         error : err
//       })
//     });
// }

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
      Device_Data.findAll({offset, limit, order: [['start_time', 'DESC']]})
        .then(data => {
          res.send({
            offset,
            cnt : limit,
            totcnt : cnt,
            data
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving device_datas."
          });
        });
    })
    .catch(err => {
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
    res.send({
      status : 'ERR',
      message : 'Internal Server Error'
    })
  })
};