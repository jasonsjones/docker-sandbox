var User = require('../models/user');
var config = require('../config');

module.exports = function (apiRouter) {

    apiRouter.get('/seeddatabase', function (req, res) {
        var secret = req.query.secret;
        console.log('the secret ' + secret);

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
                    seedDatabase();
                    res.json({
                        success: true,
                        msg: 'seeded database'
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
    console.log('creating list of default users in db...');
}
