const LojaService = require("../services/LojaService");

module.exports = {

    getById: function (req, res) {
        const lojaId = req.params.id;
        LojaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            lojaId).then((loja) => {
                if (loja) {
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(loja));
                } else {
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({ status: `Não foi possível encontrar a loja com ID: ${lojaId}.` });
                }
            });
    },

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        LojaService.getAll().then(
            lojas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(lojas));
            }
        )
    },

    // handler para adicionar uma nova loja
    add: function (req, res) {
        const { nome, endereco, telefone, vendas, saldo } = req.body
        LojaService.addNew(
            { nome, endereco, telefone, vendas, saldo }
        ).then((status) => {
            res.statusCode = 201; // Status HTTP para created;
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        }).catch(error => {
            console.error(error);
            res.statusCode = 500; //Status HTTP para erro interno
            res.set("Content-Type", "application/text");
            res.send(error.message);
        });
    },

    update: function (req, res) {
        const { id, nome, endereco, telefone, vendas, saldo } = req.body
        LojaService.update(
            { id, nome, endereco, telefone, vendas, saldo }
        ).then((status) => {
            res.statusCode = 201; // Status HTTP para created;
            res.set("Content-Type", "application/json");
            res.send(JSON.stringify(status));
        }).catch(error => {
            console.error(error);
            res.statusCode = 500; //Status HTTP para erro interno
            res.set("Content-Type", "application/text");
            res.send(error.message);
        });
    },

    // handler para remover a loja pelo seu identificador
    remove: function (req, res) {
        LojaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            });
    }
}