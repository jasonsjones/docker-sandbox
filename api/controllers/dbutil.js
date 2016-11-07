var User = require('../models/user');
var Todo = require('../models/todo');
var config = require('../config');
var data = require('../models/data-users.json');

exports.seedUsers = function (req, res) {
    var secret = req.params.secret;

    if (secret === config.seedDBSecret) {
        User.find({}, function (err, collection) {
            if (err) {
                console.log('we have an error getting the users');
                res.json({
                    success: false,
                    msg: 'error getting the user collection'
                });
            }

            if (collection && collection.length === 0) {
                seedDatabase().then(function (result) {
                    if (result.success) {
                        res.json(result);
                    }
                }, function (err) {
                    res.json(err);
                });
            } else {
                res.json({
                    success: true,
                    msg: 'database already contains a collection'
                });
            }
        });
    } else {
        res.json({
            success: false,
            msg: 'incorrect secret provided'
        });
    }
};

exports.seedTodos = function (req, res) {
    User.findOne({'local.username': req.params.username})
        .exec(function (err, user) {
            if (err) {
                res.status(500).send(err);
            }
            switch (user.local.username) {
            case 'superman':
                seedSupermanTodos(res, user);
                break;
            case 'batman':
                seedBatmanTodos(res, user);
                break;
            default:
                res.json({
                    success: true,
                    msg: 'no todos added, user not found'
                });
            }
        });
};

// utility functions
function seedDatabase() {
    return new Promise(function (resolve, reject) {
        data.forEach(function (user, idx, arr) {
            user.createdDate = new Date(user.createdDate);
            User.create(user, function (err) {
                if (err) {
                    reject({
                        success: false,
                        msg: 'error seeding database'
                    });
                }
                if (idx === arr.length - 1) {
                    resolve({
                        success: true,
                        msg: 'database seeded with a Promise'
                    });
                }
            });
        });
    });
}

function seedSupermanTodos(res, user) {
    var supermanTodos = [
        {
            item: 'Save Metropolis from all evil villians',
            createdBy: user._id
        },
        {
            item: 'Stay away from kryptonite',
            dueDate: new Date('2017-02-22'),
            createdBy: user._id
        },
        {
            item: 'Get big scoop for the Daily Planet',
            createdBy: user._id
        },
        {
            item: 'Ask Lois out on a date',
            createdBy: user._id
        }
    ];
    createTodos(res, supermanTodos, user);
}

function seedBatmanTodos(res, user) {
    var batmanTodos = [
        {
            item: 'Save Gotham from all evil villians',
            dueDate: new Date('2016-12-16'),
            createdBy: user._id
        },
        {
            item: 'Give Robin a raise',
            dueDate: new Date('2017-01-17'),
            createdBy: user._id
        },
        {
            item: 'Send the Joker a Christmas card',
            dueDate: new Date('2016-12-21'),
            createdBy: user._id
        },
        {
            item: 'Remodel the Bat cave',
            completed: true,
            createdBy: user._id
        }
    ];
    createTodos(res, batmanTodos, user);
}

function createTodos(res, todos, user) {
    Todo.create(todos, function (err) {
        if (err) {
            res.status(500).send(err);
        }
        res.json({
            success: true,
            msg: 'todos seeded for ' + user.local.username
        });
    });

}
