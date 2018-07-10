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
var VendaDetalhe = require('../Models/VendaDetalhe.js');
var VendaDetalheSchema = require('../Models/VendaDetalheSchema.js');

app.use(bodyParser.urlencoded({ extended: true }));


app.get('/Categoria',function(req,res) {
    console.log("AQUI");
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
                                src: '../../Images/delete.png',
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
                                src: '../../Images/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Categoria/editar/' + obj.id,
                            image:{
                                src: '../../Images/edit.png',
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
                var allReferences = [];
                if(CategoriaSchema.references){
                    CategoriaSchema.references.forEach(function (r) {
                        allReferences.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? Categoria + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Categoria/inserir',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    var rows = Object.getOwnPropertyNames(new Categoria());
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
                var allReferences = [];
                if (CategoriaSchema.references) {
                    CategoriaSchema.references.forEach(function (r) {
                        allReferences.push({
                            id: r.model.concat('Id'),
                            label: r.label,
                            model: r.model,
                            relation: r.relation == '1-M',
                            type : 'insert',
                            bdId: r.model.toLowerCase().concat('_id')
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            modelname : Categoria
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
	            return array;		
	        },		
	        references: function () {		
	            var allReferences = [];		
	            if (Categoria.references) {		
	                Categoria.references.forEach(function (ref) {		
	                    allReferences.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bd_id: ref.model.toLowerCase() + "_id",
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'Categoria/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferences;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Marca',function(req,res) {
    console.log("AQUI");
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
                                src: '../../Images/delete.png',
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
                                src: '../../Images/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Marca/editar/' + obj.id,
                            image:{
                                src: '../../Images/edit.png',
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
                var allReferences = [];
                if(MarcaSchema.references){
                    MarcaSchema.references.forEach(function (r) {
                        allReferences.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? Marca + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Marca/inserir',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    var rows = Object.getOwnPropertyNames(new Marca());
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
                var allReferences = [];
                if (MarcaSchema.references) {
                    MarcaSchema.references.forEach(function (r) {
                        allReferences.push({
                            id: r.model.concat('Id'),
                            label: r.label,
                            model: r.model,
                            relation: r.relation == '1-M',
                            type : 'insert',
                            bdId: r.model.toLowerCase().concat('_id')
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            modelname : Marca
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
	            return array;		
	        },		
	        references: function () {		
	            var allReferences = [];		
	            if (Marca.references) {		
	                Marca.references.forEach(function (ref) {		
	                    allReferences.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bd_id: ref.model.toLowerCase() + "_id",
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'Marca/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferences;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Produto',function(req,res) {
    console.log("AQUI");
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
                                src: '../../Images/delete.png',
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
                                src: '../../Images/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Produto/editar/' + obj.id,
                            image:{
                                src: '../../Images/edit.png',
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
                var allReferences = [];
                if(ProdutoSchema.references){
                    ProdutoSchema.references.forEach(function (r) {
                        allReferences.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? Produto + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Produto/inserir',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    var rows = Object.getOwnPropertyNames(new Produto());
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
                var allReferences = [];
                if (ProdutoSchema.references) {
                    ProdutoSchema.references.forEach(function (r) {
                        allReferences.push({
                            id: r.model.concat('Id'),
                            label: r.label,
                            model: r.model,
                            relation: r.relation == '1-M',
                            type : 'insert',
                            bdId: r.model.toLowerCase().concat('_id')
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            modelname : Produto
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
	            return array;		
	        },		
	        references: function () {		
	            var allReferences = [];		
	            if (Produto.references) {		
	                Produto.references.forEach(function (ref) {		
	                    allReferences.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bd_id: ref.model.toLowerCase() + "_id",
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'Produto/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferences;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/Venda',function(req,res) {
    console.log("AQUI");
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
                                src: '../../Images/delete.png',
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
                                src: '../../Images/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './Venda/editar/' + obj.id,
                            image:{
                                src: '../../Images/edit.png',
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
                var allReferences = [];
                if(VendaSchema.references){
                    VendaSchema.references.forEach(function (r) {
                        allReferences.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? Venda + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/Venda/inserir',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    var rows = Object.getOwnPropertyNames(new Venda());
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
                var allReferences = [];
                if (VendaSchema.references) {
                    VendaSchema.references.forEach(function (r) {
                        allReferences.push({
                            id: r.model.concat('Id'),
                            label: r.label,
                            model: r.model,
                            relation: r.relation == '1-M',
                            type : 'insert',
                            bdId: r.model.toLowerCase().concat('_id')
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            modelname : Venda
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
	            return array;		
	        },		
	        references: function () {		
	            var allReferences = [];		
	            if (Venda.references) {		
	                Venda.references.forEach(function (ref) {		
	                    allReferences.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bd_id: ref.model.toLowerCase() + "_id",
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'Venda/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferences;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});
app.get('/VendaDetalhe',function(req,res) {
    console.log("AQUI");
    VendaDetalhe.all(function(rows){
            res.render('list',{
                title: 'VendaDetalhe',
                columns: Object.keys(new VendaDetalhe()).map(key =>{
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
                                src: '../../Images/delete.png',
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
                            link: './VendaDetalhe/detalhe' + obj.id,
                            image:{
                                src: '../../Images/read.png',
                                alt: 'Detalhes'
                            },
                            tooltip: 'Detalhe'
                        },{
                            label: '',
                            link: './VendaDetalhe/editar/' + obj.id,
                            image:{
                                src: '../../Images/edit.png',
                                alt: 'Editar'
                            },
                            tooltip: 'Editar'
                        }]

                    }
                })
            });
            
        
    });
    
});

app.get('/VendaDetalhe/detalhe/:id',function(req,res) {
    var dadosVendaDetalhe = VendaDetalhe.get(req.params.id, function(props){
        res.render('details', {
            properties: function(){
                var array = [];
                var rows = Object.getOwnPropertyNames(props);
                rows.forEach(element => {
                    if(VendaDetalheSchema.properties.hasOwnProperty(element)){
                        array.push({name: element, value: props[element]});
                    }
                });
                return array;
            },
            references: function(){
                var allReferences = [];
                if(VendaDetalheSchema.references){
                    VendaDetalheSchema.references.forEach(function (r) {
                        allReferences.push({
                            label: r.label,
                            model: r.model,
                            values: r.relation == "M-M" ? VendaDetalhe + '/' + req.params.id :
                                props[(r.model + "_id").toLowerCase()]
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences(){
                return this.hasReferences().length > 0;
            }
        });
    });
});

app.get('/VendaDetalhe/inserir',function(req,res) {
    res.render('form',{
properties: function() {
    var array = [];
    var rows = Object.getOwnPropertyNames(new VendaDetalhe());
    rows.forEach(element => {
        props = VendaDetalheSchema.properties;
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
                var allReferences = [];
                if (VendaDetalheSchema.references) {
                    VendaDetalheSchema.references.forEach(function (r) {
                        allReferences.push({
                            id: r.model.concat('Id'),
                            label: r.label,
                            model: r.model,
                            relation: r.relation == '1-M',
                            type : 'insert',
                            bdId: r.model.toLowerCase().concat('_id')
                        });
                    });
                }
                return allReferences;
            },
            get hasReferences() {
                return this.references().length > 0;
            },
            modelname : VendaDetalhe
        });
    });



app.get('/VendaDetalhe/editar/:id',function(req,res){
    var dadosVendaDetalhe = VendaDetalhe.get(req.params.id,function(props){
        res.render('form',{
            title: 'VendaDetalhe',
            VendaDetalhe: req.params.id,
            properties: function(){
                var array = [];		
                var rows = Object.getOwnPropertyNames(props);		
	            rows.forEach(element => {		
	                prop = VendaDetalhe.properties;		
	                if (prop.hasOwnProperty(element)) {		
	                    var min, max;		
	                    var elem = prop[element];		
	                    if (elem.hasOwnProperty('minimum')) min = `min="${elem.minimum}"`;		
	                    if (elem.hasOwnProperty('maximum')) max = `max="${elem.maximum}"`;		
	                    array.push({ name: element, minimum: min, maximum: max, value: props[element] });		
	                }		
	            });		
	            return array;		
	        },		
	        references: function () {		
	            var allReferences = [];		
	            if (VendaDetalhe.references) {		
	                VendaDetalhe.references.forEach(function (ref) {		
	                    allReferences.push({		
	                        id: ref.model.concat('Id'),		
	                        label: ref.label,		
	                        model: ref.model,
                            type : 'edit',	
	                        relation: ref.relation == '1-M',
                            bd_id: ref.model.toLowerCase() + "_id",
	                        values: function(){
                                var x;
                                if(this.relation)
                                    x = props[(ref.model + "_id").toLowerCase()]
                                else x = 'VendaDetalhe/' + req.params.id
                                return x;
                            }
	                    });		
	                });		
	            }		
	            return allReferences;		
	        },		
	        get hasReferences() {		
	            return this.references().length > 0;		
	        }		
        });		
	});		
});

module.exports = app;