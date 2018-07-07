
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mustache = require("mustache");
var fs = require('fs');
var mustacheExpress = require('mustache-express');

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', __dirname + '/Views'); //indicação de qual a pasta que irá conter as views

app.get('/', function (req, res) {res.render('index', {port: '8083'}) });

module.exports = app;