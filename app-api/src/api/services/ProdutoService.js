const ProdutoRepository = require("../repositories/ProdutoRepository");

module.exports = {
    getAll: async function () {
        return ProdutoRepository.all();
    },

    update: async function (produto) {
        return ProdutoRepository.update(produto);
    },

    getById: async function (identificador) {
        return ProdutoRepository.findById(identificador);
    },

    addNew: async function (produto) {
        // Cadastrando o produto com os dados fornecidos
        const data = await ProdutoRepository.create(produto);
        if (data) return { status: "Produto cadastrado com sucesso." }
        else return { status: "Não foi possível cadastrar o produto." }
    },

    removeById: async function (identificador) {
        const status = await ProdutoRepository.removeById(identificador);
        if (status) return { status: "Produto apagado com sucesso." }
        else return { status: "Produto não encontrado." }
    }
}