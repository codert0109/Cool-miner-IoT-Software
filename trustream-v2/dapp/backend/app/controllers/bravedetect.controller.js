exports.setCookie = function(req, res) {
    res.cookie('elumdetector', 'bravedetect', { maxAge: 900000, httpOnly: true })
    res.send({
        status : 'OK',
        message : 'Cookie set successfully!'
    });
};

exports.checkCookie = function(req, res) {
    res.send({
        status : 'OK',
        cookie : req.cookies['elumdetector']
    })
};