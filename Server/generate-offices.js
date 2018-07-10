var mustache = require('mustache');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync("./Server/config.json"));

function gerarOffices(){
    let backoffice = "";
    for (let i = 0; i < config.models.length; i++) {
        let classe = JSON.parse(fs.readFileSync(config.models[i].path + "" + config.models[i].name));
        fs.readFile('./Server/backoffice.mustache', function (err, data) {
            if (err) {
                throw err;
            }
            //let view = getView(classe);
            let view = {
                title: classe.title,
                schema: classe.title + 'Schema',
                db: config.dbname
            }
            backoffice += "\n" + mustache.render(data.toString(), view);

            if(i == config.models.length - 1) {
                criarOffices(backoffice);
            }
        });
    }
}

function criarOffices(backoffice){
    let frontoffice = "";
    fs.readFile('./Server/offices.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        let view = {
            /*methods: "app.get('/', function (req, res) {"
            +"res.render('index', {"
            +"port: '8083'"
            +"}) });"*/
            /*methods: "app.get('/', function (req, res) {"
            +"res.render('index', {"+
                "title: 'Hey'," +
                "message: 'Hello there!'"+
                "}) });"*/
                methods: "app.get('/',function(req,res) {\n res.send('View: Frontoffice'); \n});"
                
        };
        frontoffice += "\n" + mustache.render(data.toString(), view);

        fs.writeFile('./Publish/Controllers/frontoffice.js' , frontoffice, function () {
            console.log("Created frontoffice.js");
        });
    });

    fs.readFile('./Server/offices.mustache', function (err, data) {
        if (err) {
            throw err;
        }
        let view = {
            methods: backoffice
        }
        let output = mustache.render(data.toString(), view);
        fs.writeFile('./Publish/Controllers/backoffice.js' , output, function () {
            console.log("Created backoffice.js");
        });
    });
}

function getView(classe){
    var view = {
        title: classe.title
    }
    return view;
}

module.exports.gerarOffices = gerarOffices;