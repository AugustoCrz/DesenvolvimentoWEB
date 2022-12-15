const { Carrinho } = require("./database/models/index")

class CarrinhoRepository {

    async create(item) {
        return await Carrinho.create(item);
    }

    async findById(identificador) {
        return await Carrinho.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Carrinho.findAll();
    }

    async update(item) {
        return await Carrinho.update(
            item,
            { where: { id: item.id } }
        )
    }

    async removeById(identificador) {
        return await Carrinho.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new CarrinhoRepository();