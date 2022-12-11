const db = require("../models");
const Server_Update = db.server_updates;
const Op = db.Sequelize.Op;

function createSeed() {
    const version   = '1.0.0';
    const download  = 'https://download.elumicate.com/miner_1.0.0.zip';
    const message   = 'We launched the mining software.';
    return Server_Update.create({ version, download, message });
}

exports.createUpdate = (req, res) => {
    const {version, download, message, note} = req.body;

    if (version == null || download == null || message == null) {
        res.send({
            status : 'ERR',
            message : 'Bad Request'
        });
        return;
    }

    Server_Update.create({
        version, download, message, note
    }).then(() => {
        res.send({
            status : 'OK',
            message : 'Create Success'
        })
    }).catch((err) => {
        console.error(err);
        res.send({
            status : 'ERR',
            message : 'Internal Server Error'
        })
    });
};

exports.findAll = (req, res) => {
    Server_Update.findAll()
        .then((data) => {
            res.send({
                status : 'OK',
                data 
            });
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status : 'ERR',
                message : 'Internal Server Error'
            });
        });
};

exports.getUpdate = (req, res) => {
    Server_Update.count()
        .then((data) => {
            if (data == 0) { // creating seed items.
                createSeed()
                    .then(() => {
                        this.getUpdate(req, res);
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status : 'ERR',
                            message : 'Internal Server Error'
                        });
                    });
            } else {
                Server_Update.findOne({ order: [['id', 'DESC']]})
                    .then((data) => {
                        res.send({
                            status : 'OK',
                            version : data.version,
                            message : data.message,
                            download : data.download,
                            note     : data.note
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status : 'ERR',
                            message : "Internal Server Error"
                        })
                    });
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status : 'ERR',
                message : 'Internal Server Error'
            })
        });
};