module.exports = function (app) {

    app.get('/', function (req, res) {
        // res.render('index', {
        //     title: 'Docker Node App',
        //     msg: 'Hello world from Docker'
        // });
        // res.sendFile('../index.html');
        res.send('API works...!');
    });
};
