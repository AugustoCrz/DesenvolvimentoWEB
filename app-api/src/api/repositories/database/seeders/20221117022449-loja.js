'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('lojas', [
      {
        id: 1,
        nome: "Rei dos descontos",
        endereco: "Rua das ostras, 395",
        telefone: '11 4283-3485',
        vendas: 10,
        saldo: 3024.54
      },
      {
        id: 2,
        nome: "Tudo 1,99",
        endereco: "Rua das conchas, 2834",
        telefone: '11 1234-4321',
        vendas: 199,
        saldo: 3394.54
      },
      {
        id: 3,
        nome: "Barataria",
        endereco: "25 de março, 2834",
        telefone: '11 8493-3582',
        vendas: 999,
        saldo: 28482.54
      },
      {
        id: 4,
        nome: "Utilidades",
        endereco: "Rua das aves, 2842",
        telefone: '11 2934-2344',
        vendas: 10,
        saldo: 3024.54
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('lojas', null, {});
  }
};
