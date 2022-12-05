const AcaoRepository = require("../repositories/AcaoRepository.js");

module.exports = {
    getAll: async function () {
        return AcaoRepository.all();
    },

    update: async function (conta) {
        return AcaoRepository.update(conta);
    },

    getById: async function (identificador) {
        return AcaoRepository.findById(identificador);
    },

    addNew: async function (acao) {
        // Criando a conta com os dados fornecidos
        const data = await AcaoRepository.create(acao);
        if (data) return { status: "Ação registrada com sucesso." }
        else return { status: "Não foi possível criar a ação." }
    },

    removeById: async function (identificador) {
        const status = await AcaoRepository.removeById(identificador);
        if (status) return { status: "Ação encerrada com sucesso." }
        else return { status: "Ação não encontrada." }
    }
}