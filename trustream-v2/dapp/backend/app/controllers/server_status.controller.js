const MINER_CONFIG = require('../config/miner.config');
const tcpPortUsed = require('tcp-port-used');
const DB_CONFIG = require('../config/db.config');

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
            host : MINER_CONFIG.HOST,     
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