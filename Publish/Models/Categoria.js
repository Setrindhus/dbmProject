//const dbname = './/Database/DataBase.db';
const dbname = './Publish/Database/DataBase.db';

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

Categoria.delete = function (id, callback) {
    if(this.id){
        database.run('Delete From Categoria Where categoria_id = ?', [this.id,this.nome,id],callback);
    }
}

Categoria.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Categoria Set id = ?,nome = ? Where categoria_id = ?', [this.id,this.nome,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Categoria (id,nome) Values (?,?)',[this.id,this.nome], callback);
    }
}

Categoria.many = function (model, id, callback) {
    database.where(`Select Categoria.* From Categoria Inner Join ${model}_Categoria On ${model}_Categoria.categoria_id =
     Categoria.categoria_id Where ${model}_Categoria.${model.toLowerCase()}_id = ?`, [id], Categoria, callback);
}

Categoria.mappingDBtoObject = {
    id:'id',nome:'nome',categoria_id:'id'
}

module.exports = Categoria;