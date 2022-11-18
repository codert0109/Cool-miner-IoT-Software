const db = require('../models')
const Profile = db.profiles

exports.updateEmail = (req, res) => {
    const { address, email } = req.body;

    if (address == null || email == null) {
        res.send({
            status: 'ERR',
            message: 'Bad request'
        });
        return;
    }

    Profile.findOne({ where: { address } })
        .then((data) => {
            Profile.update({
                
            });
        })
        .catch((err) => {
            res.send({
                status: 'ERR',
                message : 'Internal Server Error'
            })
        });
};