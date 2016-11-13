var User = require('../models/user');
var userController = require('../controllers/user');

module.exports = function (apiRouter) {

    apiRouter.route('/users')
        .get(userController.getAllUsers)
        .post(userController.addUser);

    apiRouter.route('/users/admin')
        .get(userController.getAdminUsers);

    // middleware to run each time /user/:id is hit.
    // this will find the user by id and assign it to req.user
    // where each other routes downstream will have access to.
    apiRouter.use('/user/:id', userController.findUserById);

    apiRouter.route('/user/:id')
        .get(userController.getSingleUser)
        .put(userController.updateUser)
        .patch(userController.patchUser)
        .delete(userController.deleteUser);

    apiRouter.post('/login', function (req, res) {
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
        });
    });

    apiRouter.get('/users/hashDefaultPasswords', function (req, res) {
        User.find({}, function (err, users) {
            if (err) {
                res.status(500).send(err);
            }
            if (users) {
                console.log('hash the passwords...');
                hashPasswords(users)
                    .then(function (result) {
                        res.json(result);
                    });
            } else {
                res.json({success: false, msg: 'No users in database'});
            }
        });
    });

    function hashPasswords(users) {
        return new Promise(function (resolve, reject) {
            users.forEach(function (user, idx, arr) {
                console.log(user.name.full);
                console.log(user.local.password);
                console.log(user.hashDefaultPassword());
                if (idx === arr.length - 1) {
                    resolve({success: true,
                             msg: 'passwords hashed with a promise'
                    });
                }

                if (idx === arr.length) {
                    reject({success: false});
                }
            });

        });
    }
};
