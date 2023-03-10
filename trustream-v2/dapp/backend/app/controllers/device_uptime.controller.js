const db = require('../models')
const Device_Uptime = db.device_uptimes
const Op = db.Sequelize.Op;
const { getValue } = require('./key_status.controller')
const MINER_CONFIG = require('../config/miner.config')
const { sequelize, Sequelize } = require('../models')


// Core APIs
exports.getAll = (query) => {
  // needs to be optimized
  return Device_Uptime.findAll({ where: query })
}

// address     : deviceUpTimeData[i].address,
// amount      : curReward,
// uptime      : deviceUpTimeData[i].uptime,
// nft_id      : deviceUpTimeData[i].nft_id,
// multiplier  : parseInt(deviceUpTimeData[i].multiplier * 10000),
// epoch       : last_epoch

exports.updateUptimeInfo = async ({
  address,
  amount,
  uptime,
  nft_id,
  multiplier,
  epoch,
}) => {
  try {
    let data = await Device_Uptime.findOne({
      where: { address, epoch, nft_id },
    })
    if (data == null) {
      console.error('Device_Uptime.data cannot be null.')
      return
    }
    await Device_Uptime.update(
      { address, reward: amount, uptime, nft_id, multiplier, epoch },
      { where: { address, epoch, nft_id } },
    )
  } catch (err) {
    console.error(err)
  }
}

// Restful API
exports.getUpTimeInfo = (req, res) => {
  const { address } = req.body

  if (address == null) {
    res.send({
      status: 'ERR',
      message: 'Bad request',
    })
    return
  }

  getValue('LAST_UPDATED_EPOCH')
    .then((data) => {
      if (data == null) {
        res.send({
          status: 'OK',
          address,
          data: [],
        })
        return
      }
      Device_Uptime.findAll({
        where: {
          [Op.and]: [
            {
              address: address,
            },
            {
              epoch: {
                // we assume that if the updated timestamp is older than 1 hour, we will assign new NFT.
                [Op.gt]: data.value - 24,
                [Op.lte]: data.value,
              },
            },
          ],
        },
      })
        .then((uptimeInfo) => {
          const periodDay = 24;
          const periodWeek = periodDay * 7;
          const periodMonth = periodWeek * 30;
          const precision = 8;

          let periodList = [periodDay, periodWeek, periodMonth];
          let periodName = ['Past Day', 'Past Week', 'Past Month'];

          let promiseList = [];
          
          for (let i = 0; i < periodList.length; i++) {
            promiseList.push(
              Device_Uptime.findAll({
                attributes: [
                  'nft_id',
                  [
                    sequelize.fn(
                      'SUM', 
                      sequelize.cast(
                        sequelize.fn(
                          'LEFT', 
                          sequelize.col('reward'), 
                          -(18 - precision)
                        ),
                        'BIGINT'
                      )
                    ),     
                    'reward_info'
                  ]
                ],
                where : {
                  [Op.and]: [
                    {
                      address: address,
                    },
                    {
                      epoch: {
                        [Op.gt]: data.value - periodList[i],
                        [Op.lte]: data.value,
                      },
                    },
                  ],
                },
                group : ['nft_id']
              })
            );
          }

          Promise.all(promiseList)
            .then((promiseData) => {
              res.send({
                status: 'OK',
                address,
                data : uptimeInfo,
                rewardHistory : {
                  data : promiseData,
                  precision
                }
              })
            })
            .catch((err) => {
              console.error(err);
              res.send({
                status: 'ERR',
                message: 'Internal Server Error',
              })
            });
        })
        .catch((err) => {
          console.error('errors in device_uptime.getUpTimeInfo', err)
          res.send({
            status: 'ERR',
            message: 'Internal Server Error',
          })
        })
    })
    .catch((err) => {
      console.error(err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

exports.getUpTime = (req, res) => {
  const { address } = req.body
  Device_Uptime.findOne({
    attributes: [
      'address',
      [sequelize.fn('sum', sequelize.col('uptime')), 'total_uptime'],
    ],
    group: ['address'],
  })
    .then((data) => {
      let uptime = 0
      if (data !== null) uptime = data.dataValues.total_uptime
      res.send({
        status: 'OK',
        address,
        uptime,
      })
    })
    .catch((err) => {
      console.error('errors in device_uptime.getUpTime', err)
      res.send({
        status: 'ERR',
        message: 'Internal Server Error',
      })
    })
}

// This works when we don't have epoch field.
// It will not work now.
// exports.fixUpTime = async (req, res) => {
//     try {
//         let deviceLists = await Device_Uptime.findAll();
//         for (let i = 0; i < deviceLists.length; i++) {
//             let item = deviceLists[i].address;
//             let count = await Device_Data.count({ where : {address : item}});
//             await Device_Uptime.update(
//                 { uptime : MINER_CONFIG.UPLOAD_TIME_INTERVAL * count },
//                 { where : { address : item }}
//             );
//         }
//         res.send({
//             status : 'OK',
//             solved : deviceLists.length
//         });
//     } catch (err) {
//         res.send({
//             status : 'ERR',
//             message : 'Internal Server Error'
//         });
//         console.log(err);
//     }
// };
