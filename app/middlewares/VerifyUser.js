var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config/auth.config'); // get our config file
const User = require('../models/user.model');

function admin(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    // var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        {

            if ("admin" !== decoded.role) {
                return res.status(500).send({auth: false, message: 'Unauthorized Access'});
            }
            {
                next();
            }
        }
    });

}

function user(req, res, next) {

    // check header or url parameters or post parameters for token
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    // var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({auth: false, message: 'No token provided.'});

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        {

            if ("user" !== decoded.role) {
                return res.status(500).send({auth: false, message: 'Unauthorize Access'});
            }
            {
                next();
            }
        }

    });

}

const verifyUser = {
    admin,
    user
};

module.exports = verifyUser;
