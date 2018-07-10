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
    "categoria_nome": {
    "description": "Nome da categoria",
    "type": "string"
    }
    },
    "required": ["id", "categoria_nome"]
};
