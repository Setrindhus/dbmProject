var Ajv = require('ajv');
var ajv = new Ajv({allErrors: true});
var fs = require('fs');

var schema = JSON.parse(fs.readFileSync("./Models/Schemas/Categoria.json"));
var schema2 = JSON.parse(fs.readFileSync("./Models/Schemas/Marca.json"));
var schema3 = JSON.parse(fs.readFileSync("./Models/Schemas/Categoria.json"));
var schema4 = JSON.parse(fs.readFileSync("./Models/Schemas/Categoria.json"));


function test(schema,data) {
var validate = ajv.compile(schema);
var valid = validate(data);
if (valid) console.log('Valid!');
else console.log('Invalid: ' + ajv.errorsText(validate.errors));
}

test(schema,{"id": 1, "nome": "Belga"});
test(schema2,{"id": 1, "nome": "Ferrero"});