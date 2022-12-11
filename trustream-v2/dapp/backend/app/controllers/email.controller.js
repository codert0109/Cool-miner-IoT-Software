const db = require('../models')
const Email = db.emails

exports.verifyEmail = (req, res) => {
    const { email } = req.body;
    if (email == null) {
        res.send({
            status : 'ERR',
            message : 'Not allowed'
        });
    } else {
        Email.findOne({ where : { email }})
            .then((data) => {
                if (data == null) {
                    res.send({
                        status : 'ERR',
                        message : 'Not allowed'
                    });                    
                } else {
                    res.send({
                        status : 'OK',
                        message : 'You are allowed'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                res.send({
                    status : 'ERR',
                    message : 'Internal Server Error'
                });
            });
    };
};