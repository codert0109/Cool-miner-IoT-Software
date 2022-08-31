const db = require("../models");
const Device_Uptime = db.device_uptimes;
const Op = db.Sequelize.Op;
const MINER_CONFIG = require('../config/miner.config');

exports.getUpdate = (req, res) => {
    res.send({
        status: 'OK',
        version: '1.0.4',
        download: 'https://sharepoint/elumicate1.0.4_windows_x86_64.zip',
        message: 'We have made some improvements and have released a new version of the mining software. Please download and install. Thanks for your support. Elumicate'
    })
};