var express = require('express'),
    config = require('./config/config'),
    glob = require('glob'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');
mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
    throw new Error('unable to connect to database at ' + config.db);
});

var app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
    require(model);
});


app.listen(config.port, function () {
    console.log( "Listening on server_port " + config.port )
});

/*
app.listen(config.port, function () {
    console.log('Express server listening on port ' + config.port);
});
*/









require('./config/express')(app, config);
