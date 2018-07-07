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


app.get('/backoffice/Categoria',function(req,res) {
    res.send('View: Backoffice Categoria');
});

app.get('/backoffice/Categoria/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Categoria Detalhe');
});

app.get('/backoffice/Marca',function(req,res) {
    res.send('View: Backoffice Marca');
});

app.get('/backoffice/Marca/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Marca Detalhe');
});

app.get('/backoffice/Produto',function(req,res) {
    res.send('View: Backoffice Produto');
});

app.get('/backoffice/Produto/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Produto Detalhe');
});

app.get('/backoffice/Venda',function(req,res) {
    res.send('View: Backoffice Venda');
});

app.get('/backoffice/Venda/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Venda Detalhe');
});


module.exports = app;