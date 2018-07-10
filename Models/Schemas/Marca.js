module.exports = {
    "title": "Marca",
    "description": "Marca do produto",
    "type": "object",
    "properties": {
        "id": {
            "description": "Número de identificação único da marca",
            "type": "integer",
            "unique": true
        },
        "marca_nome": {
            "description": "Nome da marca",
            "type": "string"
        }
    },
    "required": [
        "id",
        "marca_nome"
    ]
}