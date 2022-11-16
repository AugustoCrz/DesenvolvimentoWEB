const TransferenciaService = require("../services/TransferenciaService");

module.exports = {

    getById: function (req, res) {
        const transferenciaId = req.params.id;
        TransferenciaService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            transferenciaId).then((transferencia) => {
                if (transferencia) {
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(transferencia));
                } else {
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({ status: `Não foi possível encontrar uma transferência com ID: ${transferenciaId}.` });
                }
            });
    },

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        TransferenciaService.getAll().then(
            transferencias => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(transferencias));
            }
        )
    },

    // handler para registrar uma nova transferência
    add: function (req, res) {
        const { data, conta, conta_alvo, valor } = req.body
        TransferenciaService.addNew(
            { data, conta, conta_alvo, valor }
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

    // handler para eliminar a transferência pelo seu identificador
    remove: function (req, res) {
        TransferenciaService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
            );
    }
}