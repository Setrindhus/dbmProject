//const dbname = './/Database/DataBase.db';
const dbname = './Publish/Database/DataBase.db';

function Produto (id,produto_nome,produto_preco) {
        this.id = id;
                 
        this.produto_nome = produto_nome;
                 
        this.produto_preco = produto_preco;
                 
        Object.defineProperty(this,'id',{ enumerable:false});
}

var database = require('../../Models/Database/sqlite.js')(dbname);

Produto.all = function (callback) {
    database.all('Select * From Produto',Produto,callback)
}

Produto.get = function (id, callback) {
    database.get('Select * From Produto} Where produto_id = ?', [id], Produto,callback)
}

Produto.delete = function (id, callback) {
    if(this.id){
        database.run('Delete From Produto Where produto_id = ?', [this.id,this.produto_nome,this.produto_preco,id],callback);
    }
}

Produto.prototype.save = function (callback) {
    if(this.id) { //Se existir valor no id serÃ¡ para update
        database.run('Update Produto Set id = ?,produto_nome = ?,produto_preco = ? Where produto_id = ?', [this.id,this.produto_nome,this.produto_preco,id], callback);
    } else { //caso contrÃ¡rio para insert
        database.run('Insert Into Produto (id,produto_nome,produto_preco) Values (?,?,?)',[this.id,this.produto_nome,this.produto_preco], callback);
    }
}

Produto.many = function (model, id, callback) {
    database.where(`Select Produto.* From Produto Inner Join ${model}_Produto On ${model}_Produto.produto_id =
     Produto.produto_id Where ${model}_Produto.${model.toLowerCase()}_id = ?`, [id], Produto, callback);
}

Produto.mappingDBtoObject = {
    id:'id',produto_nome:'produto_nome',produto_preco:'produto_preco',produto_id:'id'
}

module.exports = Produto;