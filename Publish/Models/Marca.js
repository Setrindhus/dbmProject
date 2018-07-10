//const dbname = './/Database/DataBase.db';
const dbname = './Publish/Database/DataBase.db';

function Marca (id,marca_nome) {
        this.id = id;
                 
        this.marca_nome = marca_nome;
                 
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
        database.run('Delete From Marca Where marca_id = ?', [this.id,this.marca_nome,id],callback);
    }
}

Marca.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Marca Set id = ?,marca_nome = ? Where marca_id = ?', [this.id,this.marca_nome,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Marca (id,marca_nome) Values (?,?)',[this.id,this.marca_nome], callback);
    }
}

Marca.many = function (model, id, callback) {
    database.where(`Select Marca.* From Marca Inner Join ${model}_Marca On ${model}_Marca.marca_id =
     Marca.marca_id Where ${model}_Marca.${model.toLowerCase()}_id = ?`, [id], Marca, callback);
}

Marca.mappingDBtoObject = {
    id:'id',marca_nome:'marca_nome',marca_id:'id'
}

module.exports = Marca;