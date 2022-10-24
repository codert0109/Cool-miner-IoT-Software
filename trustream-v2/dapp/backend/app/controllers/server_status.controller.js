const tcpPortUsed = require('tcp-port-used');
const DB_CONFIG = require('../config/db.config');

const { getValue, updateValue } = require('./key_status.controller');

async function getList(callback) {
    const serverList = [
        { 
            name : 'MQTT',        
            host : '127.0.0.1',     
            port : 1883
        },
        { 
            name : 'W3bstream',   
            host : '127.0.0.1',     
            port : 5555
        },
        { 
            name : 'Database',    
            host : DB_CONFIG.HOST,     
            port : 5432
        }
    ];

    let response = [];

    for (let server of serverList) {
        let working = true;
        try {
            let ret = await tcpPortUsed.check(server.port, server.host);
            working = ret;
        } catch (err) {
            console.error(err);
            working = true;
        }

        response.push({
            name : server.name,
            working
        })
    }

    callback(response);
}

exports.getServers = async (req, res) => {
    getList(function(response) {
        res.send(response);  
    })
};

exports.getRequiredVersion = async (req, res) => {
    const DEFAULT_VERSION = '1.0.0';

    try {
        let result = await getValue('REQUIRED_VERSION');
        if (result == null)
            result = DEFAULT_VERSION;
        res.send({
            status : 'OK',
            message : {
                version : result
            }
        })
    } catch (err) {
        console.error(err);
        res.send({
            status : 'ERR',
            message : 'Internal Server Error'
        })
    }
};

exports.setRequiredVersion = async (req, res) => {
    const { version } = req.body;
    if (version == null) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
        return;
    }

    try {
        await updateValue('REQUIRED_VERSION', version);
        res.send({
            status : 'OK',
            message : 'Update Success'
        })
    } catch (err) {
        console.error(err);
        res.send({
            status : 'ERR',
            message : 'Internal Server Error'
        })
    }
};