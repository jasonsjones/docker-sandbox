var dbUtilController = require('../controllers/dbutil');

module.exports = function (apiRouter) {

    apiRouter.get('/seeddatabase/users/:secret', dbUtilController.seedUsers);
    apiRouter.get('/seeddatabase/todo/:username', dbUtilController.seedSupermanTodos);
}
