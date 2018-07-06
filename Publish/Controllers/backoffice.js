var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


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