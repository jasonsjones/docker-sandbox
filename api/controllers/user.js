var User = require('../models/user');

// middleware controller function to find a user by their id
// and then attach the user to the req object, this will make it
// available to all routes on the /user/:id route
exports.findUserById = function (req, res, next) {
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
    })
};

exports.getSingleUser = function (req, res) {
    res.json(req.user);
};
