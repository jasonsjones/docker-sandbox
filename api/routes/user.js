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
        .put(function (req, res) {
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    console.log(req.body);
                    user.name = req.body.name;
                    user.email = req.body.email;
                    user.admin = req.body.admin;
                    if (req.body.local) {
                        user.local = {
                            username: req.body.local.username || '',
                            password: req.body.local.password || ''
                        }
                    }

                    user.save(function (err, updatedUser) {
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
                }
            });
        })
        .patch(function (req, res) {
            User.findById(req.params.id, function (err, user) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (req.body._id) {
                        delete req.body._id;
                    }

                    for (var p in req.body) {

                        if (p === 'local') {
                            for (var q in req.body['local']) {
                                user['local'][q] = req.body['local'][q];
                            }
                        }
                        user[p] = req.body[p];
                    }

                    user.save(function (err, updatedUser) {
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
};
