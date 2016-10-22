var User = require('../models/user');

module.exports = function (apiRouter) {

    apiRouter.route('/users')
        .get(function (req, res) {
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
        })
        .post(function (req, res) {
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

    // middleware to run each time /user/:id is hit.
    // this will find the user by id and assign it to req.user
    // where each other routes downstream will have access to.
    apiRouter.use('/user/:id', function (req, res, next) {
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
        })
    });

    apiRouter.route('/user/:id')
        .get(function (req, res) {
            res.json(req.user);
        })
        .put(function (req, res) {
            req.user.name = req.body.name;
            req.user.email = req.body.email;
            req.user.admin = req.body.admin;
            req.user.save(function (err, updatedUser) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        success: true,
                        msg: 'user [PUT] updated',
                        user: updatedUser
                    });
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            // don't want the user to update their password in this
            // PATCH route.
            // TODO: implement password update as it own POST route.
            if (req.body.local && req.body.local.password) {
                delete req.body.local.password;
            }
            for (var p in req.body) {
                if (p === 'local') {
                    for (var q in req.body['local']) {
                        req.user['local'][q] = req.body['local'][q];
                    }
                }
                req.user[p] = req.body[p];
            }

            req.user.save(function (err, updatedUser) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        success: true,
                        msg: 'user [PATCH] updated',
                        user: updatedUser
                    });
                }
            });
        })
        .delete(function (req, res) {
            req.user.remove(function (err, deletedUser) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        success: true,
                        msg: 'User deleted',
                        user: deletedUser
                    });
                }
            });
        });

    apiRouter.post('/login', function (req, res) {
        console.log(req.body);
        User.find({'local.username': req.body.username}, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }

            if (user) {
                var attemptedPassword = req.body.local.password;
                if (attemptedPassword && user.verifyPassword(attemptedPassword)) {
                    res.json({
                        success: true,
                        msg: 'Login successful.',
                        user: user
                    });
                }
            } else {
                res.json({
                    success: false,
                    msg: 'User not found.',
                    user: null
                });

            }
        })
    });
};
