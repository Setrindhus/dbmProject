//const dbname = './/Database/DataBase.db';
const dbname = './Publish/Database/DataBase.db';

function VendaDetalhe (id) {
        this.id = id;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../../Models/Database/sqlite.js')(dbname);

VendaDetalhe.all = function (callback) {
    database.all('Select * From VendaDetalhe',VendaDetalhe,callback)
}

VendaDetalhe.get = function (id, callback) {
    database.get('Select * From VendaDetalhe} Where vendadetalhe_id = ?', [id], VendaDetalhe,callback)
}

VendaDetalhe.delete = function (id, callback) {
    if(this.id){
        database.run('Delete From VendaDetalhe Where vendadetalhe_id = ?', [this.id,id],callback);
    }
}

VendaDetalhe.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update VendaDetalhe Set id = ? Where vendadetalhe_id = ?', [this.id,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into VendaDetalhe (id) Values (?)',[this.id], callback);
    }
}

VendaDetalhe.many = function (model, id, callback) {
    database.where(`Select VendaDetalhe.* From VendaDetalhe Inner Join ${model}_VendaDetalhe On ${model}_VendaDetalhe.vendadetalhe_id =
     VendaDetalhe.vendadetalhe_id Where ${model}_VendaDetalhe.${model.toLowerCase()}_id = ?`, [id], VendaDetalhe, callback);
}

VendaDetalhe.mappingDBtoObject = {
    id:'id',vendadetalhe_id:'id'
}

module.exports = VendaDetalhe;