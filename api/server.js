var express = require('express');
var config = require('./config');

var app = require('./app');

require('./dbconnection')(config);

var apiRouter = express.Router();
require('./routes/dbutil')(apiRouter);
require('./routes/user')(apiRouter);
require('./routes/todo')(apiRouter);
require('./routes/index')(app);
app.use('/api', apiRouter);

app.listen(config.port, listenCallback);

function listenCallback() {
    console.log('App running in container on port ' + config.port);
}
