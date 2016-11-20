var userController = require('../controllers/user');

module.exports = function (apiRouter) {

    apiRouter.post('/login', userController.login);
    
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
};
