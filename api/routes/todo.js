var todoController = require('../controllers/todo');

module.exports = function (apiRouter) {

    apiRouter.route('/todos')
        .get(todoController.getAllTodos)
        .post(todoController.addTodo);
};
