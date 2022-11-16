const ProdutoService = require("../services/ProdutoService");

module.exports = {

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        ProdutoService.getAll().then(
            produtos => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(produtos));
            }
        )
    },

    // handler para adicionar um novo produto
    add: function (req, res) {
        const { nome, quantidade, categoria, valor } = req.body
        ProdutoService.addNew(
            { nome, quantidade, categoria, valor }
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
        const { nome, quantidade, categoria, valor } = req.body
        ProdutoService.update(
            { nome, quantidade, categoria, valor }
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

    // handler para remover o produto pelo seu identificador
    remove: function (req, res) {
        ProdutoService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            }
            );
    }
}