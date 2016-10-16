var User = require('../models/user');

module.exports = function (apiRouter) {

    apiRouter.get('/users', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                console.log(err);
                return;
            }
            if (users) {
                console.log('returning all users...');
                res.json(users);
            } else {
                res.json({success: false, msg: 'No users in database'});
            }
        });
    });

    apiRouter.route('/user/:id')
        .get(function (req, res) {
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    console.log(err);
                    return;
                }
                if (user) {
                    console.log('returning user...');
                    res.json(user);
                } else {
                    res.json({success: false, msg: 'User not found'});
                }
            });
        })
        .delete(function (req, res) {
            User.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    console.log(err);
                    return;
                } else {
                    res.json({
                        success: true,
                        msg: 'User deleted'
                    });
                }
            });
        });

    apiRouter.post('/users', function (req, res) {
        var newUser = new User(req.body);

        newUser.save(function (err, user) {
            if (err) {
                console.log(err);
                return;
            }

            res.json({success: true,
                      user: user});
        });
    });
};
