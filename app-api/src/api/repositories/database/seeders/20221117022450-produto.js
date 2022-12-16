'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('produtos', [
      {
        id: 1,
        nome: "Meias",
        quantidade: 9999,
        categoria: 'Roupa e Banho',
        preco: 10,
        idLoja: 1
      },
      {
        id: 2,
        nome: "Caneta",
        quantidade: 9999,
        categoria: 'Utensílios',
        preco: 2.50,
        idLoja: 2
      },
      {
        id: 3,
        nome: "Celular",
        quantidade: 9999,
        categoria: 'Eletrônicos',
        preco: 900,
        idLoja: 2
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('produtos', null, {});
  }
};
