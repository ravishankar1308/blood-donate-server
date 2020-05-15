var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/auth.config'); // get our config file

function verifyToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    // var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });

            console.log('draaa');
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) {
            console.log('raaa');
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        }
        // if everything is good, save to request for use in other routes
        next();
    });
}

module.exports = verifyToken;