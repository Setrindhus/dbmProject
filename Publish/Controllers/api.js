var express = require('express');
var router = express.Router();

/**
* Método que faz o mapeamento entre um objeto retornado pelo módulo sqlite num objeto de uma classe
criada
* @param {any} object Representa o objeto retornado pela query à abse de dados
* @param {any} type Representa o tipo de objeto que se pretende converter
* @returns Devolve um objeto do tipo "type" com o conteúdo que está no objeto "object"
*/
function mapping(object, type) {
    var obj = new type();
    Object.keys(object).forEach(function (value) {
        if (obj.hasOwnProperty(value)) //Se o objeto possuir o atributo que se está a verificar então recebe o valor retornado da query da base de dados
        obj[value] = object[value];
    });
    return obj;
}


var Marca = require('../Models/Marca.js');

router.post('/Marca', function (req, res) {
    mapping(req.body, Marca).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo da classe
});

router.get('/Marca', function (req, res) {
    Marca.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Marca/:id', function (req, res) {
    Marca.get(req.params.id, function (row) {
    res.json(row);
    });
});

router.put('/Marca/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Marca);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/Marca/:id', function (req, res) {
    Marca.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});
var Produto = require('../Models/Produto.js');

router.post('/Produto', function (req, res) {
    mapping(req.body, Produto).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo da classe
});

router.get('/Produto', function (req, res) {
    Produto.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Produto/:id', function (req, res) {
    Produto.get(req.params.id, function (row) {
    res.json(row);
    });
});

router.put('/Produto/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Produto);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/Produto/:id', function (req, res) {
    Produto.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});
var Categoria = require('../Models/Categoria.js');

router.post('/Categoria', function (req, res) {
    mapping(req.body, Categoria).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo da classe
});

router.get('/Categoria', function (req, res) {
    Categoria.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Categoria/:id', function (req, res) {
    Categoria.get(req.params.id, function (row) {
    res.json(row);
    });
});

router.put('/Categoria/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Categoria);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/Categoria/:id', function (req, res) {
    Categoria.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});
var Venda = require('../Models/Venda.js');

router.post('/Venda', function (req, res) {
    mapping(req.body, Venda).save(); //converte o objeto retornado no corpo do pedido num objeto do tipo da classe
});

router.get('/Venda', function (req, res) {
    Venda.all(function (rows) { //função de callback que quando for retornado os dados na base de dados, os mesmos serão enviados em json
        res.json(rows);
    });
});

router.get('/Venda/:id', function (req, res) {
    Venda.get(req.params.id, function (row) {
    res.json(row);
    });
});

router.put('/Venda/:id', function (req, res) { //o id tanto poderia ir no corpo da mensagem como por parâmetro no url
    var obj = mapping(req.body, Venda);
    obj.id = req.params.id; //no caso de ir no corpo da mensagem tem de se fazer a atribuição do id após o mapeamento do objeto
    obj.save(function (err) { //devolve true em caso de ter feito o save sem qualquer erro
        res.json({
            success: !err
        });
    });
});

router.delete('/Venda/:id', function (req, res) {
    Venda.delete(req.params.id, function (err) {
        res.json({
            success: !err
        });
    });
});

module.exports = router;
