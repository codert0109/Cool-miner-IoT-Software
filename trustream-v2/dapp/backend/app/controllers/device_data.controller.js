const db = require("../models");
const Device_Data = db.device_datas;
const Op = db.Sequelize.Op;
const MINER_CONFIG = require('../config/miner.config');

// Core API Functions for Device_Data
const checkActive = (address, callback) => {
  Device_Data.findOne({ where : { address}, order: [['timestamp', 'DESC']]})
    .then((data) => {
      if (data === null)
        callback(false);
      else {
        if (Date.now() - new Date(data.timestamp * 1000) > MINER_CONFIG.MINEDATA_TIME_OUT * 1000) {
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

// RESTful APIs for Device_Data

// Retrieve all Tutorials from the database.

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
      Device_Data.findAll({offset, limit, order: [['timestamp', 'DESC']]})
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