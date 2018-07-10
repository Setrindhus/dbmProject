var fs = require('fs');
var mustache = require('mustache');
var sqlite3 = require('sqlite3').verbose();

function gerarBD() {

    var conf = JSON.parse(fs.readFileSync("./Server/config.json"));
    var db = new sqlite3.Database("./Publish/Database/" + conf.dbname);

    var conjuntoDeTables = "";

    conf.models.forEach(element => {
        var caminho = element.path + element.name;
        var json = JSON.parse(fs.readFileSync(caminho));

        var tableElements = "";

        Object.keys(json.properties).forEach(prop => {
            let fieldName = json.title.toLowerCase() + "_" + prop;
            tableElements += fieldName + " ";

            if (json.properties[prop].unique) {
                tableElements += " INTEGER PRIMARY KEY AUTOINCREMENT";
            }
            else if (json.properties[prop].type == "string") {
                tableElements += "TEXT";
            }
            else if (json.properties[prop].type == "integer") {
                tableElements += "INTEGER";
            }

            json.required.forEach(element => {
                if (element == prop) {
                    tableElements += " NOT NULL";
                }
            });

            if (json.properties[prop].minimum || json.properties[prop].minimum === 0) {
                tableElements += " CHECK(" + fieldName + " > " + json.properties[prop].minimum + ")";
            }
            if (json.properties[prop].maximum) {
                tableElements += " CHECK(" + fieldName + " < " + json.properties[prop].maximum + ")";
            }
            /*if (json.properties[prop].tamanho) {
                tableElements += " CHECK(LENGTH(" + prop + ") = " + json.properties[prop].tamanho + ")";
            }*/

            tableElements += ",\n";
        });

        tableElements = tableElements.slice(0, -2);

        var view = {
            title: json.title,
            tableElements: tableElements,
            foreignKeys: getFKs(json)
        }

        data = fs.readFileSync('./Models/Database/create-table.mustache');
        var output = mustache.render(data.toString(), view);
        conjuntoDeTables += output;
    });
    serializarDB(db, conjuntoDeTables);

}

function getFKs(json) {
    var fk = "";
    if (json.hasOwnProperty('references')) {
        json.references.forEach(model => {
            var name = model.model;
            var nameLower = name.toLowerCase();
            fk += `ALTER TABLE ${json.title} ADD COLUMN ${nameLower}_id INTEGER REFERENCES ${name} (${nameLower}_id);\n`;
            if (model.relation === "1-1") {
                fk += `CREATE UNIQUE INDEX IF NOT EXISTS ${nameLower}_unique ON ${json.title} (${nameLower});\n`;

            }
        });
    }
    var s = fk.slice(0, fk.length - 1);
    return s;
}

function serializarDB(db, conjuntoDeTables) {

    var tabelas = conjuntoDeTables.split(";");
    tabelas.pop(tabelas.size - 1);

    db.serialize(function () {
        tabelas.forEach(element => {
            db.run(element, function () {
            });
        });
    });
    db.close(function (err) {
        if (err)
            return console.error(err.message);
        console.log('Close the database connection.');
    });
}

module.exports.gerarBD = gerarBD;