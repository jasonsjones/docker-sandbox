var mongoose = require('mongoose');

module.exports = function (config) {

    mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function () {
        console.log('We are connected to mongo container');
    });

};
