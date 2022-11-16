const ContaService = require("../services/ContaService");

module.exports = {

    getById: function (req, res) {
        const contaId = req.params.id;
        ContaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            contaId).then((conta) => {
                if (conta) {
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(conta));
                } else {
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({ status: `Não foi possível encontrar uma conta com ID: ${contaId}.` });
                }
            });
    },

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        ContaService.getAll().then(
            contas => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(contas));
            }
        )
    },

    // handler para adicionar uma nova conta
    add: function (req, res) {
        const { nome, sobrenome, endereco, saldo } = req.body
        ContaService.addNew(
            { nome, sobrenome, endereco, saldo }
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
        const { nome, sobrenome, endereco, saldo } = req.body
        ContaService.update(
            { nome, sobrenome, endereco, saldo }
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

    // handler para remover a conta pelo seu identificador
    remove: function (req, res) {
        ContaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
            );
    }
}