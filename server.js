// server.js
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var port = process.env.PORT || 3000;

// configuration ===============================================================
app.use(bodyParser.json());
app.use(favicon(__dirname + '/dist/images/favicon.ico'));
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.set('views', __dirname + '/dist/views');
app.set('view engine', 'ejs');

var path;
var user;
var password;
if (process.env.DB_USER && process.env.DB_PASS && process.env.DB_PATH) {
  user = process.env.DB_USER;
  password = process.env.DB_PASS;
  path = process.env.DB_PATH;
}

mongoose.connect('mongodb://' + user + ':' + password + '@' + path);

// routes ======================================================================
require('./app/routes.js')(app);

// launch ======================================================================
http.listen(port, function() {
  console.log('The voodoo happens on port 3000');
});

exports.app = app;