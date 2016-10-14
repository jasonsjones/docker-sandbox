var User = require('../models/user');
var config = require('../config');

var data = require('../models/data-users.json');

module.exports = function (apiRouter) {

    apiRouter.get('/seeddatabase/:secret', function (req, res) {
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
    });
}

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
