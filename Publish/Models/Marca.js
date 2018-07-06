const dbname = './/Database/DataBase.db';

function Marca (id,nome) {
        this.id = id;
                 
        this.nome = nome;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../../Models/Database/sqlite.js')(dbname);

Marca.all = function (callback) {
    database.all('Select * From Marca',Marca,callback)
}

Marca.get = function (id, callback) {
    database.get('Select * From Marca} Where marca_id = ?', [id], Marca,callback)
}

Marca.delete = function (id, callback) {
    if(this.id){
        database.run('Delete From Marca Where marca_id = ?', [this.id,this.nome,id],callback);
    }
}

Marca.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Marca Set id = ?,nome = ? Where marca_id = ?', [this.id,this.nome,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Marca (id,nome) Values (?,?)',[this.id,this.nome], callback);
    }
}

Marca.mappingDBtoObject = {
    id:'id',nome:'nome',marca_id:'id'
}

module.exports = Marca;