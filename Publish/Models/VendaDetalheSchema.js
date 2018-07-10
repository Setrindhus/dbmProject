module.exports = {
    "title": "VendaDetalhe",
    "description": "Produtos numa venda",
    "type": "object",
    "properties": {
        "id": {
            "description": "Número de identificação único do produto da venda",
            "type": "integer",
            "unique": true
        }
    },
    "required": [
        "id"
    ],
    "references": [
        {
            "model": "Produto",
            "relation": "1-M"
        },
        {
            "model": "Venda",
            "relation": "1-M"
        }
    ]
}