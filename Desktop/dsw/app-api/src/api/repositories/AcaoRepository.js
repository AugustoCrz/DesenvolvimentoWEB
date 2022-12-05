const { Acao } = require("./database/models/index")

class AcaoRepository {

    async create(acao) {
        return await Acao.create(acao);
    }

    async findById(identificador) {
        return await Acao.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Acao.findAll();
    }

    async update(acao) {
        return await Acao.update(
            acao,
            { where: { id: acao.identificador } }
        )
    }

    async removeById(identificador) {
        return await Acao.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new AcaoRepository();