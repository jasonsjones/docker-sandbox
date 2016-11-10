var User = require('../models/user');

// middleware controller function to find a user by their id
// and then attach the user to the req object, this will make it
// available to all routes on the /user/:id route
exports.findUserById = function (req, res, next) {
    User.findById(req.params.id, '-local.password', function (err, user) {
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
};

exports.getAllUsers = function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).send(err);
        }
        if (users) {
            res.json(users);
        } else {
            res.json({success: false, msg: 'No users in database'});
        }
    });
};

exports.addUser = function (req, res) {
    // TODO: need to check if there is already a user created with the
    // username provided
    var newUser = new User(req.body);

    newUser.save(function (err, user) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({success: true,
                  user: user});
    });
};

exports.getAdminUsers = function (req, res) {
    User.find({admin: true}, function (err, admins) {
        if (err) {
            res.status(500).send(err);
        }

        res.json(admins);
    });
};

exports.getSingleUser = function (req, res) {
    res.json(req.user);
};

exports.updateUser = function (req, res) {
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
};

exports.patchUser = function (req, res) {
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
};

exports.deleteUser = function (req, res) {
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
};
