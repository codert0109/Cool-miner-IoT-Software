const db = require('../models')
const Profile = db.profiles

exports.getProfile = (req, res) => {
    const address = req.get('address');

    if (address == undefined) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
        return;
    }

    Profile.findOne({ where : { address }})
        .then((data) => {
            if (data == null) {
                res.send({
                    status : 'OK',
                    address,
                    email : '',
                    setting : '{}'
                })
            } else {
                res.send({
                    status : 'OK',
                    address,
                    email : data.email,
                    setting : data.setting
                })
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status: 'ERR',
                message : 'Internal Server Error'
            })
        });
};

exports.updateEmail = (req, res) => {
    const address = req.get('address');
    const { email } = req.body;    

    if (address == null || email == null) {
        res.send({
            status: 'ERR',
            message: 'Bad request'
        });
        return;
    }

    Profile.findOne({ where: { address } })
        .then((data) => {
            if (data == null) {
                Profile.create({ address, email }, { where : { address } })
                    .then((data) => {
                        res.send({
                            status: 'OK',
                            message : 'Create Success'
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status: 'ERR',
                            message : 'Internal Server Error'
                        })
                    });
            } else {
                Profile.update({ address, email }, { where : { address } })
                    .then((data) => {
                        res.send({
                            status: 'OK',
                            message : 'Update Success'
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status: 'ERR',
                            message : 'Internal Server Error'
                        })
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status: 'ERR',
                message : 'Internal Server Error'
            })
        });
};


exports.updateSetting = (req, res) => {
    const address = req.get('address');
    const { setting } = req.body;    

    if (address == null || setting == null) {
        res.send({
            status: 'ERR',
            message: 'Bad request'
        });
        return;
    }

    Profile.findOne({ where: { address } })
        .then((data) => {
            if (data == null) {
                Profile.create({ address, setting }, { where : { address } })
                    .then((data) => {
                        res.send({
                            status: 'OK',
                            message : 'Create Success'
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status: 'ERR',
                            message : 'Internal Server Error'
                        })
                    });
            } else {
                Profile.update({ address, setting }, { where : { address } })
                    .then((data) => {
                        res.send({
                            status: 'OK',
                            message : 'Update Success'
                        })
                    })
                    .catch((err) => {
                        console.error(err);
                        res.send({
                            status: 'ERR',
                            message : 'Internal Server Error'
                        })
                    })
            }
        })
        .catch((err) => {
            console.error(err);
            res.send({
                status: 'ERR',
                message : 'Internal Server Error'
            })
        });
};

