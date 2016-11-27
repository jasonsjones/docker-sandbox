var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(express.static('./'));
app.use(express.static('./public/'));

module.exports = app;
