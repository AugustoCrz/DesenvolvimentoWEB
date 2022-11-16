const { Transferencia } = require("./database/models/index")

class TransferenciaRepository {

    async create(transferencia) {
        return await Transferencia.create(transferencia);
    }

    async findById(identificador) {
        return await Transferencia.findAll({
            where: {
                id: identificador
            }
        });
    }

    async all() {
        return await Transferencia.findAll();
    }

    async removeById(identificador) {
        return await Transferencia.destroy({
            where: {
                id: identificador
            }
        })
    }
}

module.exports = new TransferenciaRepository();