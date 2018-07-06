var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var fs = require('fs');

var schema = JSON.parse(fs.readFileSync("./Models/Schemas/validateAlunos.json"));
var validate = ajv.compile(schema);


function test(data) {
var valid = validate(data);
if (valid) console.log('Valid!');
else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}

test({"numero": 123456789, "nome": "joao", "morada": "rua", "notaFinal": 10});

var schema2 = JSON.parse(fs.readFileSync("./Models/Schemas/validateTurma.json"));
var validate2 = ajv.compile(schema2);

function test2(data) {
    var valid = validate2(data);
    if (valid) console.log('Valid!');
    else console.log('Invalid: ' + ajv.errorsText(validate2.errors));
    }
    test2({"numero": 123456789, "nome": "joao", "morada": "rua", "notaFinal": 10, "turmaAtual":{
        "nome": "INF1", "curso": "EI", "ano": 2018
    }});