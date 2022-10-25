const db = require("../models");
const Device_Uptime = db.device_uptimes;
const { getValue } = require('./key_status.controller');
const MINER_CONFIG = require('../config/miner.config');
const { sequelize } = require("../models");
// const Device_Data = db.device_datas;
// const Op = db.Sequelize.Op;

// Core APIs
exports.getAll = (query) => {
    // needs to be optimized
    return Device_Uptime.findAll({ where : query});
}

// address     : deviceUpTimeData[i].address, 
// amount      : curReward,
// uptime      : deviceUpTimeData[i].uptime,
// nft_id      : deviceUpTimeData[i].nft_id,
// multiplier  : parseInt(deviceUpTimeData[i].multiplier * 10000),
// epoch       : last_epoch

exports.updateUptimeInfo = async ({address, amount, uptime, nft_id, multiplier, epoch}) => {
    try {
        let data = await Device_Uptime.findOne({ where : { address, epoch, nft_id } });
        if (data == null) {
            console.error('Device_Uptime.data cannot be null.');
            return;
        }        
        await Device_Uptime.update({ address, reward : amount, uptime, nft_id, multiplier, epoch}, { where : { address, epoch, nft_id}});
    } catch (err) {
        console.error(err);
    }
}

// Restful API
exports.getUpTimeInfo = (req, res) => {
    const { address } = req.body;

    if (address == null) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
        return;
    }

    getValue('LAST_UPDATED_EPOCH')
        .then((data) => {
            if (data == null) {
                res.send({
                    status : 'OK',
                    address,
                    data : []
                })
                return;
            }
            Device_Uptime.findAll({ 
                where : { address, epoch : data.value }
            })
                .then((data) => {
                    res.send({
                        status : 'OK',
                        address,
                        data
                    })
                })
                .catch((err) => {
                    console.error('errors in device_uptime.getUpTimeInfo', err);
                    res.send({
                        status : 'ERR',
                        message : 'Internal Server Error' 
                    });
                });
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status : 'ERR',
                message : 'Internal Server Error'
            })
        });
}

exports.getUpTime = (req, res) => {
    const { address } = req.body;
    Device_Uptime.findOne({ 
        attributes : [
            'address',
            [sequelize.fn('sum', sequelize.col('uptime')), 'total_uptime'],
        ],
        group : ['address'] 
    })
        .then((data) => {
            let uptime = 0;
            if (data !== null) uptime = data.dataValues.total_uptime;
            res.send({
                status : 'OK',
                address,
                uptime
            })
        })
        .catch((err) => {
            console.error('errors in device_uptime.getUpTime', err);
            res.send({
                status : 'ERR',
                message : 'Internal Server Error' 
            });
        });
};

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