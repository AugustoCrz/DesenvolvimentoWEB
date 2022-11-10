const ContaService = require("../services/ContaController");

module.exports = {

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
        const { nome, sobrenome, identificador, saldo } = req.body
        ContaService.addNew(
            { nome, sobrenome, identificador, saldo }
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
        const { nome, sobrenome, identificador, saldo } = req.body
        ContaService.update(
            { nome, sobrenome, identificador, saldo }
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

    // handler para remover um álbum pelo seu id
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