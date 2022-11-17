'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('acoes', [
      {
        id: 1,
        nome: "EMBR3",
        tipo: "fabricante",
        valor: 14.38
      },
      {
        id: 2,
        nome: "PETR4",
        tipo: "refinaria",
        valor: 27.15
      },
      {
        id: 3,
        nome: "AMER3",
        tipo: "varejista",
        valor: 11.31
      },
      {
        id: 4,
        nome: "RENT3",
        tipo: "locadora",
        valor: 60.59
      },
      {
        id: 5,
        nome: "ITUB4",
        tipo: "banco",
        valor: 26.27
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('acoes', null, {});
  }
};
