var User = require('../models/user');

module.exports = function (apiRouter) {

    apiRouter.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
            }
            if (users) {
                console.log('returning all users...');
                res.json(users);
            } else {
                res.json({success: false, msg: 'No users in database'});
            }
        });
    });

    apiRouter.get('/user/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) {
                console.log(err);
            }
            if (user) {
                console.log('returning user...');
                res.json(user);
            } else {
                res.json({success: false, msg: 'User not found'});
            }
        });
    });
};
