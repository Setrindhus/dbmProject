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


app.get('/Categoria',function(req,res) {
    Categoria.all(function(rows){
            res.render('list',{
                title: 'Categoria',
                columns: Object.keys(new Categoria()).map(key =>{
                return {
                    name: key};
            }),
                rows: rows.map(obj =>{
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions:[{
                            label: '',
                            link: '#',
                            image:{
                                src: './StaticFiles/delete.png',
                                alt: 'Apagar'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]
                        }, {
                            label: '',
                            link: './Categoria/detalhe' + obj.id,
                            image:{
                                src: './StaticFiles/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Categoria/editar/' + obj.id,
                            image:{
                                src: './StaticFiles/edit.png',
                                alt: 'Editar'
                            },
                            tooltip: 'Editar'
                        }]

                    }
                })
            });
            
        
    });
    
});

app.get('/Categoria/detalhe/:id',function(req,res) {
    var dadosCategoria = Categoria.get(req.params.id, function(props){
        res.render('details', {
            properties: function(){
                var array = [];
                var rows = Object.getOwnPropertyNames(props);
                rows.forEach(element => {
                    if(CategoriaSchema.properties.hasOwnProperty(element)){
                        array.push({name: element, value: props[element]});
                    }
                });
                return array;
            },
            references: function(){
                var allReferencies = [];
                if(CategoriaSchema.references){
                    CategoriaSchema.references.forEach(function (r) {
                        allReferencies.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                p[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Categoria/inserir/:id',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    rows.forEach(element => {
        props = CategoriaSchema.properties;
        if (props.hasOwnProperty(element)) {
            var min, max;
            var elem = props[element];
            if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;
            if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;
            array.push({ name: element, minimum: min, maximum: max });
            }
        });
        return array;
        },
            references: function () {
                var allReferencies = [];
                if (CategoriaSchema.references) {
                    CategoriaSchema.references.forEach(function (r) {
                        allRefs.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        });
    });



app.get('/Categoria/editar/:id',function(req,res){
    var dadosCategoria = Categoria.get(req.params.id,function(props){
        res.render('form',{
            title: 'Categoria',
            Categoria: req.params.id,
            properties: function(){
                var array = [];		
                var rows = Object.getOwnPropertyNames(props);		
	            rows.forEach(element => {		
	                prop = Categoria.properties;		
	                if (prop.hasOwnProperty(element)) {		
	                    var min, max;		
	                    var elem = prop[element];		
	                    if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;		
	                    if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;		
	                    array.push({ name: element, minimum: min, maximum: max, value: props[element] });		
	                }		
	            });		
	            return arr;		
	        },		
	        references: function () {		
	            var allReferencies = [];		
	            if (Categoria.references) {		
	                Categoria.references.forEach(function (ref) {		
	                    allReferencies.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bdId: ref.model.toLowerCase().concat('_id'),
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'labs.db/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferencies;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Marca',function(req,res) {
    Marca.all(function(rows){
            res.render('list',{
                title: 'Marca',
                columns: Object.keys(new Marca()).map(key =>{
                return {
                    name: key};
            }),
                rows: rows.map(obj =>{
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions:[{
                            label: '',
                            link: '#',
                            image:{
                                src: './StaticFiles/delete.png',
                                alt: 'Apagar'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]
                        }, {
                            label: '',
                            link: './Marca/detalhe' + obj.id,
                            image:{
                                src: './StaticFiles/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Marca/editar/' + obj.id,
                            image:{
                                src: './StaticFiles/edit.png',
                                alt: 'Editar'
                            },
                            tooltip: 'Editar'
                        }]

                    }
                })
            });
            
        
    });
    
});

app.get('/Marca/detalhe/:id',function(req,res) {
    var dadosMarca = Marca.get(req.params.id, function(props){
        res.render('details', {
            properties: function(){
                var array = [];
                var rows = Object.getOwnPropertyNames(props);
                rows.forEach(element => {
                    if(MarcaSchema.properties.hasOwnProperty(element)){
                        array.push({name: element, value: props[element]});
                    }
                });
                return array;
            },
            references: function(){
                var allReferencies = [];
                if(MarcaSchema.references){
                    MarcaSchema.references.forEach(function (r) {
                        allReferencies.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                p[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Marca/inserir/:id',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    rows.forEach(element => {
        props = MarcaSchema.properties;
        if (props.hasOwnProperty(element)) {
            var min, max;
            var elem = props[element];
            if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;
            if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;
            array.push({ name: element, minimum: min, maximum: max });
            }
        });
        return array;
        },
            references: function () {
                var allReferencies = [];
                if (MarcaSchema.references) {
                    MarcaSchema.references.forEach(function (r) {
                        allRefs.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        });
    });



app.get('/Marca/editar/:id',function(req,res){
    var dadosMarca = Marca.get(req.params.id,function(props){
        res.render('form',{
            title: 'Marca',
            Marca: req.params.id,
            properties: function(){
                var array = [];		
                var rows = Object.getOwnPropertyNames(props);		
	            rows.forEach(element => {		
	                prop = Marca.properties;		
	                if (prop.hasOwnProperty(element)) {		
	                    var min, max;		
	                    var elem = prop[element];		
	                    if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;		
	                    if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;		
	                    array.push({ name: element, minimum: min, maximum: max, value: props[element] });		
	                }		
	            });		
	            return arr;		
	        },		
	        references: function () {		
	            var allReferencies = [];		
	            if (Marca.references) {		
	                Marca.references.forEach(function (ref) {		
	                    allReferencies.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bdId: ref.model.toLowerCase().concat('_id'),
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'labs.db/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferencies;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Produto',function(req,res) {
    Produto.all(function(rows){
            res.render('list',{
                title: 'Produto',
                columns: Object.keys(new Produto()).map(key =>{
                return {
                    name: key};
            }),
                rows: rows.map(obj =>{
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions:[{
                            label: '',
                            link: '#',
                            image:{
                                src: './StaticFiles/delete.png',
                                alt: 'Apagar'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]
                        }, {
                            label: '',
                            link: './Produto/detalhe' + obj.id,
                            image:{
                                src: './StaticFiles/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Produto/editar/' + obj.id,
                            image:{
                                src: './StaticFiles/edit.png',
                                alt: 'Editar'
                            },
                            tooltip: 'Editar'
                        }]

                    }
                })
            });
            
        
    });
    
});

app.get('/Produto/detalhe/:id',function(req,res) {
    var dadosProduto = Produto.get(req.params.id, function(props){
        res.render('details', {
            properties: function(){
                var array = [];
                var rows = Object.getOwnPropertyNames(props);
                rows.forEach(element => {
                    if(ProdutoSchema.properties.hasOwnProperty(element)){
                        array.push({name: element, value: props[element]});
                    }
                });
                return array;
            },
            references: function(){
                var allReferencies = [];
                if(ProdutoSchema.references){
                    ProdutoSchema.references.forEach(function (r) {
                        allReferencies.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                p[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Produto/inserir/:id',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    rows.forEach(element => {
        props = ProdutoSchema.properties;
        if (props.hasOwnProperty(element)) {
            var min, max;
            var elem = props[element];
            if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;
            if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;
            array.push({ name: element, minimum: min, maximum: max });
            }
        });
        return array;
        },
            references: function () {
                var allReferencies = [];
                if (ProdutoSchema.references) {
                    ProdutoSchema.references.forEach(function (r) {
                        allRefs.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        });
    });



app.get('/Produto/editar/:id',function(req,res){
    var dadosProduto = Produto.get(req.params.id,function(props){
        res.render('form',{
            title: 'Produto',
            Produto: req.params.id,
            properties: function(){
                var array = [];		
                var rows = Object.getOwnPropertyNames(props);		
	            rows.forEach(element => {		
	                prop = Produto.properties;		
	                if (prop.hasOwnProperty(element)) {		
	                    var min, max;		
	                    var elem = prop[element];		
	                    if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;		
	                    if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;		
	                    array.push({ name: element, minimum: min, maximum: max, value: props[element] });		
	                }		
	            });		
	            return arr;		
	        },		
	        references: function () {		
	            var allReferencies = [];		
	            if (Produto.references) {		
	                Produto.references.forEach(function (ref) {		
	                    allReferencies.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bdId: ref.model.toLowerCase().concat('_id'),
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'labs.db/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferencies;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Venda',function(req,res) {
    Venda.all(function(rows){
            res.render('list',{
                title: 'Venda',
                columns: Object.keys(new Venda()).map(key =>{
                return {
                    name: key};
            }),
                rows: rows.map(obj =>{
                    return {
                        properties: Object.keys(obj).map(key => {
                            return {
                                name: key,
                                value: obj[key]
                            }
                        }),
                        actions:[{
                            label: '',
                            link: '#',
                            image:{
                                src: './StaticFiles/delete.png',
                                alt: 'Apagar'
                            },
                            tooltip: 'Apagar',
                            events: [{
                                name: "onclick",
                                function: "apagar",
                                args: obj.id
                            }]
                        }, {
                            label: '',
                            link: './Venda/detalhe' + obj.id,
                            image:{
                                src: './StaticFiles/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Venda/editar/' + obj.id,
                            image:{
                                src: './StaticFiles/edit.png',
                                alt: 'Editar'
                            },
                            tooltip: 'Editar'
                        }]

                    }
                })
            });
            
        
    });
    
});

app.get('/Venda/detalhe/:id',function(req,res) {
    var dadosVenda = Venda.get(req.params.id, function(props){
        res.render('details', {
            properties: function(){
                var array = [];
                var rows = Object.getOwnPropertyNames(props);
                rows.forEach(element => {
                    if(VendaSchema.properties.hasOwnProperty(element)){
                        array.push({name: element, value: props[element]});
                    }
                });
                return array;
            },
            references: function(){
                var allReferencies = [];
                if(VendaSchema.references){
                    VendaSchema.references.forEach(function (r) {
                        allReferencies.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                p[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Venda/inserir/:id',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    rows.forEach(element => {
        props = VendaSchema.properties;
        if (props.hasOwnProperty(element)) {
            var min, max;
            var elem = props[element];
            if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;
            if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;
            array.push({ name: element, minimum: min, maximum: max });
            }
        });
        return array;
        },
            references: function () {
                var allReferencies = [];
                if (VendaSchema.references) {
                    VendaSchema.references.forEach(function (r) {
                        allRefs.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? labs.db + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferencies;
            },
            get hasReferences() {
                return this.references().length > 0;
            }
        });
    });



app.get('/Venda/editar/:id',function(req,res){
    var dadosVenda = Venda.get(req.params.id,function(props){
        res.render('form',{
            title: 'Venda',
            Venda: req.params.id,
            properties: function(){
                var array = [];		
                var rows = Object.getOwnPropertyNames(props);		
	            rows.forEach(element => {		
	                prop = Venda.properties;		
	                if (prop.hasOwnProperty(element)) {		
	                    var min, max;		
	                    var elem = prop[element];		
	                    if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;		
	                    if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;		
	                    array.push({ name: element, minimum: min, maximum: max, value: props[element] });		
	                }		
	            });		
	            return arr;		
	        },		
	        references: function () {		
	            var allReferencies = [];		
	            if (Venda.references) {		
	                Venda.references.forEach(function (ref) {		
	                    allReferencies.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bdId: ref.model.toLowerCase().concat('_id'),
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'labs.db/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferencies;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});

module.exports = app;