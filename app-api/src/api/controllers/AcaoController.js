const AcaoService = require("../services/AcaoService");

module.exports = {

    getById: function (req, res) {
        const acaoId = req.params.id;
        AcaoService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            acaoId).then((acao) => {
                if (acao) {
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(acao));
                } else {
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({ status: `Não foi possível encontrar uma ação com ID: ${acaoId}.` });
                }
            });
    },

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        AcaoService.getAll().then(
            acoes => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(acoes));
            }
        )
    },

    // handler para adicionar uma nova ação
    add: function (req, res) {
        const { nome, tipo, preco } = req.body
        AcaoService.addNew(
            { nome, tipo, preco }
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
        const { id, nome, tipo, preco } = req.body
        AcaoService.update(
            { id, nome, tipo, preco }
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

    // handler para remover a ação pelo seu identificador
    remove: function (req, res) {
        AcaoService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            });
    }
}