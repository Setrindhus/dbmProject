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
        "venda_preco": {
            "description": "Preço da venda",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": [
        "id",
        //"produtosArray",
        "venda_preco"
    ]
};