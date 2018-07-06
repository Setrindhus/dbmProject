var express = require("express");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

var del = require('del');
var mkdirp = require('mkdirp');
var mustache = require('mustache');
var child_process = require('child_process');

var server = require('./Server/server');
var bd = require('./Models/Database/generate-database');
var classes = require('./Models/Class/generate-class');
var api = require('./Models/API/generate_api');
var offices = require('./Server/generate-offices');

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.get("/", function(){
    res.sendFile(_dirname + "/Public/" + "index.html");
});

app.post('/generate', function (){
    del(['Publish']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));

        mkdirp.sync('./Publish/Database');
        mkdirp.sync('./Publish/Controllers');
        mkdirp.sync('./Publish/Models');
        mkdirp.sync('./Publish/Public');
        mkdirp.sync('./Publish/Views');
        mkdirp.sync('./Publish/Public/Css');
        mkdirp.sync('./Publish/Public/Images');
        mkdirp.sync('./Publish/Public/Js');

        classes.criarClasses();

        bd.gerarBD();

        api.gerarApi();

        offices.gerarOffices();

        server.gerarServidor();
        child_process.fork('./Publish/index.js');
    });
});

var servidor = app.listen(8081, function (){
    var host = servidor.address().address
    var port = servidor.address().port
    console.log("Listening at http://%s:%s",host,port)
});