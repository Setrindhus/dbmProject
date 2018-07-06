const dbpath = 'lab7.db';
var sqlite = require('./sqlite.js')(dbpath);
var mustache = require('mustache');
var fs = require('fs');

var schema = {
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "type": "integer",
            "description": "Age in years",
            "minimum": 0
        }
    },
    "required": ["firstName", "lastName"]
}

var view = {
    dbname: dbpath,
    title: schema.title,
    table: schema.title,
    primaryKey: {
        name: "id",
        columnName: schema.title + "_id"
    },
    properties: function () { //funÃ§Ã£o para converter as propriedades que sÃ£o objectos para um array de objetos (mais fÃ¡cil para processar)
        return Object.keys(schema.properties).map(key => { //converte as propriedades que sÃ£o objectos para um array de objetos (mais fÃ¡cil para processar)
            schema.properties[key].name = key; //acrescento a propriedade name que terÃ¡ o nome da propriedade
            schema.properties[key].required = schema.required.indexOf(key) !== -1; //acrescento a propriedade required que terÃ¡ true ou false caso esteja no array required do schema
            schema.properties[key].columnName = key; //serÃ¡ o nome utilizado para a coluna que terÃ¡ na tabela da base de dados
            return schema.properties[key];
        });
    },
    get propertiesJoin() { //criar um array com os nomes das propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name
        }).join()
    },
    get propertiesJoinThis() { //criar um array com os nomes das propriedades (com o this.) e fazer o join para separar por ,
        return this.properties().map(obj => {
            return 'this.' + obj.name
        }).join()
    },
    get propertiesSetValues() { //criar um array com os nomes das propriedades (igualando a um parÃ¢metro) e fazer o join para separar por ,
        return this.properties().map(obj => {
            return obj.name + ' = ?'
        }).join()
    },
    get propertiesValuesParams() { //criar um array com os parÃ¢metros igual ao nÃºmero de propriedades e fazer o join para separar por ,
        return this.properties().map(obj => {
            return '?'
        }).join()
    },
    get mappingDBtoObject() { //criar um mapeamento entre o nome da propriedade de um objeto e a tabela da base de dados
        var props = this.properties();
        props.push(this.primaryKey);
        return props.map(obj => {
            return obj.columnName.toLowerCase() + ":'" + obj.name + "'";
        }).join()
    }
}

var templateClass = `
function {{title}} ({{propertiesJoin}}) {
    {{#properties}}
        this.{{name}} = {{name}};
        {{^required}}Object.defineProperty(this,'{{name}}',{ enumerable:false});{{/required}}         
    {{/properties}}
        Object.defineProperty(this,'{{primaryKey.name}}',{ enumerable:false});
}

var database = require('./sqlite.js')('{{dbname}}');

{{title}}.all = function (callback) {
    //fazer a chamada Ã  funÃ§Ã£o all do database
}

{{title}}.get = function (id, callback) {
    //fazer a chamada Ã  funÃ§Ã£o get do database
}

{{title}}.prototype.save = function (callback) {
    if(this.{{primaryKey.name}}) { //Se existir valor no id serÃ¡ para update
        //fazer a chamada Ã  funÃ§Ã£o run do database para atualizar o registo
    } else { //caso contrÃ¡rio para insert
        //fazer a chamada Ã  funÃ§Ã£o run do database para inserir o registo
    }
}

{{title}}.mappingDBtoObject = {
    {{{mappingDBtoObject}}}
}

module.exports = {{title}};
`

var output = mustache.render(templateClass, view);
console.log(output);

fs.writeFile('Person.js', output, function (err) {
    var Person = require('./Person.js');
    sqlite.run("CREATE TABLE IF NOT EXISTS Person (person_id INTEGER PRIMARY KEY AUTOINCREMENT,firstname TEXT,lastname TEXT, age INTEGER)", [], function () {
        var p = new Person('ola', 'mundo', 20);
        p.save(log);

        Person.get(1, log);
        Person.all(log);

        function log(value) {
            console.log(value);
        }
    });

});