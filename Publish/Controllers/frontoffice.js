
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res) {
 res.send('View: Frontoffice'); 
});

module.exports = app;