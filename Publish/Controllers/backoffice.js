var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/Categoria',function(req,res) {
    res.send('View: Backoffice Categoria');
});

app.get('/Categoria/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Categoria Detalhe');
});

app.get('/Marca',function(req,res) {
    res.send('View: Backoffice Marca');
});

app.get('/Marca/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Marca Detalhe');
});

app.get('/Produto',function(req,res) {
    res.send('View: Backoffice Produto');
});

app.get('/Produto/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Produto Detalhe');
});

app.get('/Venda',function(req,res) {
    res.send('View: Backoffice Venda');
});

app.get('/Venda/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Venda Detalhe');
});
