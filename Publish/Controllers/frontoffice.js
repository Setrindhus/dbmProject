
var express = require('express');
var app = express.Router();
var bodyParser = require("body-parser");

var Categoria = require('../Models/Categoria.js');
var CategoriaSchema = require('../Models/CategoriaSchema.js');
var Marca = require('../Models/Marca.js');
var MarcaSchema = require('../Models/MarcaSchema.js');
var Venda = require('../Models/Venda.js');
var VendaSchema = require('../Models/VendaSchema.js');
var Produto = require('../Models/Produto.js');
var ProdutoSchema = require('../Models/ProdutoSchema.js');

app.use(bodyParser.urlencoded({ extended: true }));



app.get('/',function(req,res) {
     res.render('index', {
         port:'8083'
   });
});

module.exports = app;