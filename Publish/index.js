var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var api = require('./Controllers/api.js');
var frontoffice = require('./Controllers/frontoffice.js');
var backoffice = require('./Controllers/backoffice.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'Publish/Public'));
app.use(api);
app.use(frontoffice);
app.use(backoffice);

var server = app.listen(8083, function(){
    console.log('Example app listening on port 8083');
});