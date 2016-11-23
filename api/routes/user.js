var userController = require('../controllers/user');
var authController = require('../controllers/auth');

module.exports = function (apiRouter) {

    apiRouter.post('/login', authController.login);
    
    apiRouter.route('/users')
        .get(userController.getAllUsers)
        .post(userController.addUser);

    apiRouter.route('/users/admin')
        .get(authController.verifyToken, userController.getAdminUsers);

    // middleware to run each time /user/:id is hit.
    // this will find the user by id and assign it to req.user
    // where each other routes downstream will have access to.
    apiRouter.use('/user/:id', userController.findUserById);

    apiRouter.route('/user/:id')
        .get(userController.getSingleUser)
        .put(userController.updateUser)
        .patch(userController.patchUser)
        .delete(userController.deleteUser);
};
