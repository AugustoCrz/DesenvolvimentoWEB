'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('acoes', [
      {
        id: 1,
        nome: "EMBR3",
        tipo: "fabricante",
        preco: 14.38
      },
      {
        id: 2,
        nome: "PETR4",
        tipo: "refinaria",
        preco: 27.15
      },
      {
        id: 3,
        nome: "AMER3",
        tipo: "varejista",
        preco: 11.31
      },
      {
        id: 4,
        nome: "RENT3",
        tipo: "locadora",
        preco: 60.59
      },
      {
        id: 5,
        nome: "ITUB4",
        tipo: "banco",
        preco: 26.27
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('acoes', null, {});
  }
};
