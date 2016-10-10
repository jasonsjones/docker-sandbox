var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

var app = require('./app');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('We are connected to mongo container');
});

var apiRouter = express.Router();
require('./routes/dbutil')(apiRouter);
require('./routes/user')(apiRouter);
require('./routes/index')(app);
app.use('/api', apiRouter);

app.listen(config.port, function () {
    console.log('App running in container on port ' + config.port);
});
