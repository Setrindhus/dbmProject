module.exports = {
    "title": "Venda",
    "description": "venda de produtos",
    "type": "object",
    "properties": {
        "id": {
            "description": "Número de identificação único da venda",
            "type": "integer",
            "unique": true
        },
        "produtosArray": {
            "description": "Array de produtos",
            "type": "array",
            "items": {
                "type": "object"
            }
        },
        "preco": {
            "description": "Preço da venda",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": [
        "id",
        "produtosArray",
        "preco"
    ]
};