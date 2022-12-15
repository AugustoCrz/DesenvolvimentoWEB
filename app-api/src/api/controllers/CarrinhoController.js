const CarrinhoService = require("../services/CarrinhoService");

module.exports = {

    getById: function (req, res) {
        const carrinhoId = req.params.id;
        CarrinhoService.getById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam
            carrinhoId).then((carrinho) => {
                if (carrinho) {
                    res.statusCode = 200; // Status HTTP para OK;
                    res.set("Content-Type", "application/json");
                    res.send(JSON.stringify(carrinho));
                } else {
                    res.statusCode = 404; // Status HTTP para No Found;
                    res.set("Content-Type", "application/json");
                    res.send({ status: `Não foi possível encontrar um carrinho com ID: ${carrinhoId}.` });
                }
            });
    },

    listAll: function (req, res) {
        res.statusCode = 200; // Status HTTP para OK;
        CarrinhoService.getAll().then(
            itens => {
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(itens));
            }
        )
    },

    // handler para adicionar um nova produto ao carrinho
    add: function (req, res) {
        const { idConta, idProduto, quantidade } = req.body
        CarrinhoService.addNew(
            { idConta, idProduto, quantidade }
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
        const { id, idConta, idProduto, quantidade } = req.body
        CarrinhoService.update(
            { id, idConta, idProduto, quantidade }
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

    // handler para remover o produto do carrinho pelo seu identificador
    remove: function (req, res) {
        CarrinhoService.removeById(
            // req.params acessa os parâmetros passados na path definidos como :nomeparam no router
            req.params.id).then((status) => {
                res.statusCode = 200; // Status HTTP para Operação bem sucedida "No content";
                res.set("Content-Type", "application/json");
                res.send(JSON.stringify(status));
            });
    }
}