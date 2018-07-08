
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mustache = require("mustache");
var fs = require('fs');
var mustacheExpress = require('mustache-express');
var Categoria = require('./Publish/Models/Categoria.js');
var Marca = require('./Publish/Models/Marca.js');
var Venda = require('./Publish/Models/Venda.js');
var Produto = require('./Publish/Models/Produto.js');

app.use(bodyParser.urlencoded({ extended: true }));

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache'); //extensão dos ficheiros das views
app.set('views', __dirname + '/Views'); //indicação de qual a pasta que irá conter as views

app.get('/',function(req,res) {
 res.send('View: Frontoffice'); 
});

module.exports = app;