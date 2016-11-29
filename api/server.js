var express = require('express');
var browserSync = require('browser-sync').create();
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
    browserSync.watch('api/views/index.ejs').on('change', browserSync.reload);
    console.log('App running (browser sync) in container on port ' + config.port);
    browserSync.init({
        proxy: 'localhost:' + config.port,
        files: ['index.html', 'app/**/*.ts', 'api/**/*.js'],
        open: false
    });
}
