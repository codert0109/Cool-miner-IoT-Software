const email_config = require('../config/email.config.js');
const nodemailer = require('nodemailer');
const db = require('../models')
const Email_Auth = db.email_auth;

const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : email_config.user,
    pass : email_config.pass
  }
});

transporter.verify().then(console.log).catch(console.error);

const sendMail = ({receiver, subject, content}) => {
    return transporter.sendMail({
        from : email_config.user,
        to : [receiver],
        subject : subject,
        html : content
    });
};

exports.sendMail = sendMail;

const createVerifyCode = () => {
    const digits = "0123456789";

    let str = "";

    for (let i = 0; i < 6; i++) {
        let index = Math.random() * digits.length;
        index = ~~index;
        str += digits[index];
    }

    return str;
};

exports.verifyCode = (email, code, callback) => {
    if (email == null || code == null) {
        callback(false);
    }
    else if (toString.call(code) != '[object String]') {
        callback(false);
    } else if (code.length != 6) {
        callback(false);
    } else {
        Email_Auth.findOne({ where : { email, code }})
            .then((data) => {
                if (data == null) callback(false);
                else callback(true);
            })
            .catch((err) => {
                console.error(err);
                callback(false);
            });
    }
};

exports.verifyEmail = (req, res) => {
    const { email } = req.body;

    if (email == null) {
        res.send({
            status : 'ERR',
            message : 'Bad request'
        })
        return;
    }

    let code = createVerifyCode();

    const sendEmailFunc = () => {
        sendMail({
            receiver : email, 
            subject : 'Elumicate Email Verification',
            content : `Your verification code is ${code}.`
        }).then(() => {
            res.send({
                status : 'OK',
                message : 'Success'
            })
        }).catch(() => {
            res.send({
                status : 'ERR',
                message : 'Internal Server Error'
            })
        });
    };

    Email_Auth.findOne({ where : { email }})
        .then((data) => {
            if (data == null) {
                Email_Auth.create({ email, code})
                    .then((data) => {
                        sendEmailFunc();
                    })
                    .catch((err) => {
                        res.send({
                            status : 'ERR',
                            message : 'Internal Server Error'
                        })
                    });
            } else {
                Email_Auth.update({ code }, { where : { email }})
                    .then((data) => {
                        sendEmailFunc();
                    })
                    .catch((err) => {
                        res.send({
                            status : 'ERR',
                            message : 'Internal Server Error'
                        })
                    });
            }
        })
        .catch((err) => {
            res.send({
                status : 'ERR',
                message : 'Internal Server Error'
            })
        });
};