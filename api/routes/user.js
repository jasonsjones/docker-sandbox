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
        User.findOne({'local.username': req.body.username}, function (err, user) {
            if (err) {
                res.status(500).send(err);
            }

            if (user) {
                var attemptedPassword = req.body.password;
                if (attemptedPassword && user.verifyPassword(attemptedPassword)) {
                    res.json({
                        success: true,
                        msg: 'Login successful.',
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
    });
};
