const { verifyFunction, verifyAdminFunction } = require("../controllers/portal_auth.controller.js");

exports.check_auth = function(req, res, next) {
    let session = req.get('Authorization');
    let address = req.get('address');
    verifyFunction(address, session, 
        function() {
            next();
        },
        function() {
            res.send({
                status : 'ERR',
                message : 'Authentication check failed'
            })            
        })
}

exports.check_admin_auth = function(req, res, next) {
    let session = req.get('Authorization');
    let address = req.get('address');
    verifyAdminFunction(address, session, 
        function() {
            next();
        },
        function() {
            res.send({
                status : 'ERR',
                message : 'Authentication check failed'
            })            
        })
}