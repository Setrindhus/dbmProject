const dbname = './/Database/DataBase.db';

function Venda (id,produtosArray,preco) {
        this.id = id;
                 
        this.produtosArray = produtosArray;
                 
        this.preco = preco;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../../Models/Database/sqlite.js')(dbname);

Venda.all = function (callback) {
    database.all('Select * From Venda',Venda,callback)
}

Venda.get = function (id, callback) {
    database.get('Select * From Venda} Where venda_id = ?', [id], Venda,callback)
}

Venda.delete = function (id, callback) {
    if(this.id){
        database.run('Delete From Venda Where venda_id = ?', [this.id,this.produtosArray,this.preco,id],callback);
    }
}

Venda.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Venda Set id = ?,produtosArray = ?,preco = ? Where venda_id = ?', [this.id,this.produtosArray,this.preco,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Venda (id,produtosArray,preco) Values (?,?,?)',[this.id,this.produtosArray,this.preco], callback);
    }
}

Venda.many = function (model, id, callback) {
    database.where(`Select Venda.* From Venda Inner Join ${model}_Venda On ${model}_Venda.venda_id =
     Venda.venda_id Where ${model}_Venda.${model.toLowerCase()}_id = ?`, [id], Venda, callback);
}

Venda.mappingDBtoObject = {
    id:'id',produtosarray:'produtosArray',preco:'preco',venda_id:'id'
}

module.exports = Venda;