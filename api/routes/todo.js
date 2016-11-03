var todoController = require('../controllers/todo');

module.exports = function (apiRouter) {

    apiRouter.route('/todos')
        .get(todoController.getAllTodos)
        .post(todoController.addTodo);

    apiRouter.use('/todo/:id', todoController.findTodoById);

    apiRouter.route('/todo/:id')
        .get(todoController.getSingleTodo)
        .put(todoController.updateTodo)
        .delete(todoController.deleteTodo);
};
