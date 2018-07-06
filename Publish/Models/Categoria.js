const dbname = './/Database/DataBase.db';

function Categoria (id,nome) {
        this.id = id;
                 
        this.nome = nome;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../../Models/Database/sqlite.js')(dbname);

Categoria.all = function (callback) {
    database.all('Select * From Categoria',Categoria,callback)
}

Categoria.get = function (id, callback) {
    database.get('Select * From Categoria} Where categoria_id = ?', [id], Categoria,callback)
}

Categoria.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Categoria Set id = ?,nome = ? Where categoria_id = ?', [this.id,this.nome,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Categoria (id,nome) Values (?,?)',[this.id,this.nome], callback);
    }
}

Categoria.mappingDBtoObject = {
    id:'id',nome:'nome',categoria_id:'id'
}

module.exports = Categoria;