const { Loja } = require("./database/models/index")

class LojaRepository {

    async create(loja) {
        return await Loja.create(loja);
    }

    async findById(identificador) {
        return await Loja.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Loja.findAll();
    }

    async update(loja) {
        return await Loja.update(
            loja,
            { where: { id: loja.id } }
        )
    }

    async removeById(identificador) {
        return await Loja.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new LojaRepository();