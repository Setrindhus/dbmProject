var mustache = require('mustache');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync("./Server/config.json"));

function criarClasses() {
    for (let i = 0; i < config.models.length; i++) {
        let classe = JSON.parse(fs.readFileSync(config.models[i].path + "" + config.models[i].name));
        fs.readFile('./Models/Class/class.mustache', function (err, data) {
            if (err) {
                throw err;
            }
            let view = getView(classe);
            var output = mustache.render(data.toString(), view);
            fs.writeFile('./Publish/Models/' + classe.title + '.js', output, function () {
                console.log("Created File: " + classe.title);
            });
        });
    }
}

function getView(schema) {
    var view = {
    title: schema.title,
    table: schema.title.toLowerCase(),
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
    return view;
}

/*
function getView(classe) {
    var view = {
        classTitle: classe.title,
        classProperties: Object.keys(classe.properties),
        classConstructor: function () {
            var cons = "\n";
            var enums = "\n";
            Object.keys(classe.properties).forEach(prop => {
                cons += "this." + prop + "=" + prop + ";\n";
                var isRequired = false;
                (classe.required).forEach(val => {
                    if (prop == val) {
                        isRequired = true;
                    }
                });
            });

            return cons + enums;
        }
    }
    return view;
}
*/

module.exports.criarClasses = criarClasses;


