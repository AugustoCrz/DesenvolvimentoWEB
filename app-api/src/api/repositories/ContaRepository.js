const { Conta } = require("./database/models/index")

class ContaRepository {

    async create(conta) {
        return await Conta.create(conta);
    }

    async findById(identificador) {
        return await Conta.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Conta.findAll();
    }

    async update(conta) {
        return await Conta.update(
            conta,
            { where: { id: conta.id } }
        )
    }

    async removeById(identificador) {
        return await Conta.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new ContaRepository();