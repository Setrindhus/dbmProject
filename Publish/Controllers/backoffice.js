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


app.get('/backoffice/Produto',function(req,res) {
    fs.readFile('./Server/list.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        var object = new Produto();
        let view = {
            title: 'Produto',
            columns: Object.keys(new Produto()).map(key =>{
                return {
                    name: key};
            }),
            rows : [{
                properties: [],
                actions: [{
                    link: '#',
                    tooltip: 'Apagar',
                    events: [{
                        name: "onclick",
                        function: "apagar",
                        args: object.id
                    }],
                    label: '',
                    image:{
                        src: '/StaticFiles/delete.png',
                        alt: "apagar"
                    }
                }]
            }]
        }
        let output = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Views/Produto.html' , output, function () {
            console.log("Created backoffice.html");
        });
    });
    res.send('View: Backoffice Produto');
});

app.get('/backoffice/Produto/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Produto Detalhe');
});

app.get('/backoffice/Categoria',function(req,res) {
    fs.readFile('./Server/list.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        var object = new Categoria();
        let view = {
            title: 'Categoria',
            columns: Object.keys(new Categoria()).map(key =>{
                return {
                    name: key};
            }),
            rows : [{
                properties: [],
                actions: [{
                    link: '#',
                    tooltip: 'Apagar',
                    events: [{
                        name: "onclick",
                        function: "apagar",
                        args: object.id
                    }],
                    label: '',
                    image:{
                        src: '/StaticFiles/delete.png',
                        alt: "apagar"
                    }
                }]
            }]
        }
        let output = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Views/Categoria.html' , output, function () {
            console.log("Created backoffice.html");
        });
    });
    res.send('View: Backoffice Categoria');
});

app.get('/backoffice/Categoria/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Categoria Detalhe');
});

app.get('/backoffice/Venda',function(req,res) {
    fs.readFile('./Server/list.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        var object = new Venda();
        let view = {
            title: 'Venda',
            columns: Object.keys(new Venda()).map(key =>{
                return {
                    name: key};
            }),
            rows : [{
                properties: [],
                actions: [{
                    link: '#',
                    tooltip: 'Apagar',
                    events: [{
                        name: "onclick",
                        function: "apagar",
                        args: object.id
                    }],
                    label: '',
                    image:{
                        src: '/StaticFiles/delete.png',
                        alt: "apagar"
                    }
                }]
            }]
        }
        let output = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Views/Venda.html' , output, function () {
            console.log("Created backoffice.html");
        });
    });
    res.send('View: Backoffice Venda');
});

app.get('/backoffice/Venda/detalhe/:id',function(req,res) {
    res.send('View: Backoffice Venda Detalhe');
});


module.exports = app;