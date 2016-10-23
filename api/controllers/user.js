var User = require('../models/user');

exports.findById = function (req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({
                success: false,
                msg: 'User not found'
            });
        }
    });
}
