const ContaRepository = require("../repositories/ContaRepository");

module.exports = {
    getAll: async function () {
        return ContaRepository.all();
    },

    update: async function (conta) {
        return ContaRepository.update(conta);
    },

    getById: async function (identificador) {
        return ContaRepository.findById(identificador);
    },

    addNew: async function (conta) {

        // Criando a conta com os dados fornecidos
        const data = await ContaRepository.create(conta);
        if (data) return { status: "Conta aberta com sucesso." }
        else return { status: "Não foi possível criar a conta." }
    },

    removeById: async function (identificador) {
        const status = await ContaRepository.removeById(identificador);
        if (status) return { status: "Conta encerrada com sucesso." }
        else return { status: "Conta não encontrada." }
    }
}