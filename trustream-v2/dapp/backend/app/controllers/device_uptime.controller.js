const db = require("../models");
const Device_Uptime = db.device_uptimes;
const Device_Data = db.device_datas;
const Op = db.Sequelize.Op;
const MINER_CONFIG = require('../config/miner.config');

exports.getUpTime = (req, res) => {
    const { address } = req.body;
    Device_Uptime.findOne({ where : { address } })
        .then((data) => {
            let uptime = 0;
            if (data !== null) uptime = data.uptime;
            res.send({
                status : 'OK',
                address,
                uptime
            })
        })
        .catch((err) => {
            res.send({
                status : 'ERR',
                message : 'Internal Server Error' 
            });
        });
    MINER_CONFIG.UPLOAD_INTERVAL
};

exports.fixUpTime = async (req, res) => {
    try {
        let deviceLists = await Device_Uptime.findAll();
        for (let i = 0; i < deviceLists.length; i++) {
            let item = deviceLists[i].address;
            let count = await Device_Data.count({ where : {address : item}});
            await Device_Uptime.update( 
                { uptime : MINER_CONFIG.UPLOAD_TIME_INTERVAL * count }, 
                { where : { address : item }}
            );
        }
        res.send({
            status : 'OK',
            solved : deviceLists.length
        });
    } catch (err) {
        res.send({
            status : 'ERR',
            message : 'Internal Server Error'
        });
        console.log(err);
    }

};