var mongoose = require('mongoose');

var app = require('./app');

var config = {
    db: {
        host: 'mongo',
        name: 'testdb'
    },
    port: 3000
}

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('We are connected to mongo container');
})

app.get('/', function (req, res) {
    res.json({msg: 'Hello world from Docker'});
});

app.listen(config.port, function () {
    console.log("App running on port " + config.port);
});
