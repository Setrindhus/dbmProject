module.exports = {
    "title": "Produto",
    "description": "Produto da loja",
    "type": "object",
    "properties": {
        "id": {
            "description": "Número de identificação único do produto",
            "type": "integer",
            "unique": true
        },
        "nome": {
            "description": "Nome do produto",
            "type": "string"
        },
        "preco": {
            "description": "Preço do produto",
            "type": "number",
            "minimum": 0
        }
    },
    "required": [
        "id",
        "nome",
        "preco",
        "categoria",
        "marca"
    ],
    "references": [
        {
            "model": "Categoria",
            "relation": "M-1"
        },
        {
            "model": "Marca",
            "relation": "M-1"
        }
    ]
};