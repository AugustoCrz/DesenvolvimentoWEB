const TransferenciaRepository = require("../repositories/TransferenciaRepository");

module.exports = {
    getAll: async function () {
        return TransferenciaRepository.all();
    },

    getById: async function (identificador) {
        return TransferenciaRepository.findById(identificador);
    },

    addNew: async function (transferencia) {
        // Registrando a transferência com os dados fornecidos
        const data = await TransferenciaRepository.create(transferencia);
        if (data) return { status: "Transferência registrada com sucesso." }
        else return { status: "Não foi possível registrar a transferência." }
    },

    removeById: async function (identificador) {
        const status = await transferencia.removeById(identificador);
        if (status) return { status: "Registro de tranferência removido com sucesso." }
        else return { status: "Transferência não encontrada." }
    }
}