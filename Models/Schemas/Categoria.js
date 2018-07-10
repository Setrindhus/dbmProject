module.exports = {
    "title": "Categoria",
    "description": "Categoria do produto",
    "type": "object",

    "properties": {
    "id": {
    "description": "Número de identificação único da categoria",
    "type": "integer",
    "unique": true
    },
    "nome": {
    "description": "Nome da categoria",
    "type": "string"
    }
    },
    "required": ["id", "nome"]
};
