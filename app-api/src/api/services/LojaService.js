const LojaRepository = require("../repositories/LojaRepository");

module.exports = {
    getAll: async function () {
        return LojaRepository.all();
    },

    update: async function (loja) {
        return LojaRepository.update(loja);
    },

    getById: async function (identificador) {
        return LojaRepository.findById(identificador);
    },

    addNew: async function (loja) {
        // Cadastrando a loja com os dados fornecidos
        const data = await LojaRepository.create(loja);
        if (data) return { status: "Loja cadastrada com sucesso." }
        else return { status: "Não foi possível cadastrar o produto." }
    },

    removeById: async function (identificador) {
        const status = await LojaRepository.removeById(identificador);
        if (status) return { status: "Loja apagada com sucesso." }
        else return { status: "Loja não encontrada." }
    }
}