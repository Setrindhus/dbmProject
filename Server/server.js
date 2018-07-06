var fs = require('fs');
var mustache = require('mustache');


function gerarServidor() {
    fs.readFile('./Server/index.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        processIndex(data);
        iniciarServer();
    });
}

function iniciarServer() {
    fs.readFile('./Server/server.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        launchServer(data);
    });
}

function processIndex(data) {
    var view = JSON.parse(fs.readFileSync("./Server/config.json"));
    var output = mustache.render(data.toString(), view);

    fs.writeFile('./Publish/Public/index.html', output);
}

function launchServer(data) {
    var view = JSON.parse(fs.readFileSync("./Server/config.json"));
    var output = mustache.render(data.toString(), view);

    fs.writeFile('./Publish/index.js', output, function () {
        console.log("Created new Server");
    });
}

module.exports.gerarServidor = gerarServidor;
