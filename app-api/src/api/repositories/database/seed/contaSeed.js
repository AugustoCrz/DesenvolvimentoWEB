const Conta = require("../models/Conta");

module.exports = (database) => {
    database.addConta(
        new Conta(
            {
                "nome": "testador",
                "sobrenome": "testando",
                "endereco": "rua das ostras, 832",
                "saldo": 100
            }
        )
    )

    database.addConta(
        new Conta(
            {
                "nome": "teste",
                "sobrenome": "testado",
                "endereco": "rua das quitandas, 238",
                "saldo": 384
            }
        )
    )
}