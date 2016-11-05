var User = require('../models/user');
var Todo = require('../models/todo');
var dbUtilController = require('../controllers/dbutil');

module.exports = function (apiRouter) {

    apiRouter.get('/seeddatabase/:secret', dbUtilController.seedUsers);

    apiRouter.get('/seeddatabase/todo/:username', function (req, res) {
        User.findOne({'local.username': req.params.username})
            .exec(function (err, user) {
                if (err) {
                    res.status(500).send(err);
                }
                switch (user.local.username) {
                case 'superman':
                    seedSupermanTodos(res, user);
                    break;
                default:
                    res.json({
                        success: true,
                        msg: 'no todos added, user not found'
                    });
                }
            });
    });
}

function seedSupermanTodos(res, user) {
    Todo.create({
        item: 'Save Metropolis from all evil villians',
        createdBy: user._id
    }, function (err) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            success: true,
            msg: 'todos seeded for superman'
        });
    });
}
