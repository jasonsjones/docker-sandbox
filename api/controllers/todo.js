var Todo = require('../models/todo');

// middleware controller function to find a todo by its id
// and then attach the todo to the req object, this will make it
// available to all routes on the /todo/:id route
exports.findTodoById = function (req, res, next) {
    Todo.findById(req.params.id)
        .populate('createdBy', 'name local.username')
        .exec(function (err, todo) {
            if (err) {
                res.status(500).send(err);
            } else if (todo) {
                req.todo = todo;
                next();
            } else {
                res.status(404).json({
                    success: false,
                    msg: 'Todo not found'
                });
            }
        });
};

exports.getAllTodos = function (req, res) {
    Todo.find({})
        .populate('createdBy', 'name local.username')
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

exports.getSingleTodo = function (req, res) {
    res.json(req.todo);
};

exports.deleteTodo = function (req, res) {
    req.todo.remove(function (err, deletedTodo) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({
                success: true,
                msg: 'Todo deleted',
                todo: deletedTodo
            });
        }
    });
}
