const { Produto } = require("./database/models/index")

class ProdutoRepository {

    async create(produto) {
        return await Produto.create(produto);
    }

    async findById(identificador) {
        return await Produto.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Produto.findAll();
    }

    async update(produto) {

        return await Produto.update(
            produto,
            { where: { id: produto.id } }
        )
    }

    async removeById(identificador) {
        return await Produto.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new ProdutoRepository();