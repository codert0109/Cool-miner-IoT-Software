const db = require("../models");
const Device_Uptime = db.device_uptimes;
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