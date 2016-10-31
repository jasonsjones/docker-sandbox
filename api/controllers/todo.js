var Todo = require('../models/todo');

exports.getAllTodos = function (req, res) {
    Todo.find({})
        .populate('createdBy', 'name.full local.username')
        .exec(function (err, todos) {
            if (err) {
                res.status(500).send(err);
            }
            res.json(todos);
        });
};

exports.addTodo = function (req, res) {
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
};
