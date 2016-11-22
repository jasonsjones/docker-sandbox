var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

// middleware to verify token
exports.verifyToken = function (req, res, next) {
    // check header, url parameters, or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if (token) {
        jwt.verify(token, config.tokenSecret, function (err, decoded) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    msg: 'Failed to authenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
        
    } else {
        return res.status(403).json({
            success: false,
            msg: 'No token provided'
        });
        
    }
    
};

exports.login = function (req, res) {
    User.findOne({'local.username': req.body.username}, function (err, user) {
        if (err) {
            res.status(500).send(err);
        }

        if (user) {
            var attemptedPassword = req.body.password;
            if (attemptedPassword && user.verifyPassword(attemptedPassword)) {
                var token = jwt.sign(user, config.tokenSecret, {
                    expiresIn: '24h'
                });
                res.json({
                    success: true,
                    msg: 'Login successful.',
                    token: token,
                    user: user
                });
            } else {
                res.json({
                    success: false,
                    msg: 'Login Unsuccessful. Password incorrect.'
                });
            }
        } else {
            res.json({
                success: false,
                msg: 'User not found.',
                user: null
            });

        }
    });
};