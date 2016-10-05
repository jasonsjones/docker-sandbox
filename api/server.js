var express = require('express');
var mongoose = require('mongoose');
var config = require('./config');

var User = require('./models/user');

var app = require('./app');


mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('We are connected to mongo container');
});

var userRouter = express.Router();

userRouter.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            console.log(err);
        }
        if (users) {
            console.log("returning all users...");
            res.json(users);
        } else {
            res.json({success: false, msg: 'No users in database'});
        }
    });
});

userRouter.get('/user/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log(err);
        }
        if (user) {
            console.log("returning user...");
            res.json(user);
        } else {
            res.json({success: false, msg: 'User not found'});
        }
    });
});

app.use('/api', userRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Docker Node App',
        msg: 'Hello world from Docker'
    });
});

app.listen(config.port, function () {
    console.log("App running in container on port " + config.port);
});
