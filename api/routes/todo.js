var Todo = require('../models/todo');

module.exports = function (apiRouter) {

    apiRouter.route('/todos')
        .get(function (req, res) {
            Todo.find({})
                .populate('createdBy', 'name local.username')
                .exec(function (err, todos) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json(todos);
                });
        })
        .post(function (req, res) {
            var newTodo = new Todo(req.body);

            newTodo.save(function (err, todo) {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({
                    success: true,
                    todo: todo
                });
            });
        });
};
