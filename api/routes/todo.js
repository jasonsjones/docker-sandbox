var Todo = require('../models/todo');

module.exports = function (apiRouter) {

    apiRouter.route('/todos')
        .get(function (req, res) {
            Todo.find({}, function (err, todos) {
                if (err) {
                    res.status(500).send(err);
                }
                console.log('returning all todos...');
                res.json(todos);
            })
        })
};
