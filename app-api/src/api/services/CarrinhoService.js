const CarrinhoRepository = require("../repositories/CarrinhoRepository");

module.exports = {
    getAll: async function () {
        return CarrinhoRepository.all();
    },

    update: async function (item) {
        return CarrinhoRepository.update(item);
    },

    getById: async function (identificador) {
        return CarrinhoRepository.findById(identificador);
    },

    addNew: async function (item) {
        // Criando a conta com os dados fornecidos
        const data = await CarrinhoRepository.create(item);
        if (data) return { status: "Item adicionado com sucesso." }
        else return { status: "Não foi possível adicionar este item." }
    },

    removeById: async function (identificador) {
        const status = await CarrinhoRepository.removeById(identificador);
        if (status) return { status: "Item removido com sucesso." }
        else return { status: "Item não encontrado." }
    }
}