var mustache = require('mustache');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync("./Server/config.json"));

function gerarApi(){
    let output = "";
    for (let i = 0; i < config.models.length; i++) {
        let classe = JSON.parse(fs.readFileSync(config.models[i].path + "" + config.models[i].name));
        fs.readFile('./Models/API/api-calls.mustache', function (err, data) {
            if (err) {
                throw err;
            }
            let view = getView(classe);
            output += "\n" + mustache.render(data.toString(), view);

            if(i == config.models.length - 1){
                criarApi(output);
            }
        });
    }
}

function criarApi(output){
    fs.readFile('./Models/API/api.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        let view = {
            calls: output
        }
        let api = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Controllers/api.js' , api, function () {
            console.log("Created api.js");
        });
    });
}

function getView(classe){
    var view = {
        title: classe.title
    }
    return view;
}

module.exports.gerarApi = gerarApi;