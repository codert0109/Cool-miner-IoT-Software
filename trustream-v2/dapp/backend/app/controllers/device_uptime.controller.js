const db = require("../models");
const Device_Uptime = db.device_uptimes;
const MINER_CONFIG = require('../config/miner.config');
const { sequelize } = require("../models");
// const Device_Data = db.device_datas;
// const Op = db.Sequelize.Op;

exports.getAll = (query) => {
    // needs to be optimized
    return Device_Uptime.findAll({ where : query});
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
            console.log('errors in device_uptime.getUpTime', err);
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