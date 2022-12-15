'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('contas', [
      {
        id: 1,
        nome: "João",
        sobrenome: "Gomes",
        endereco: "Rua das ostras, 250",
        saldo: 359.38
      },
      {
        id: 2,
        nome: "Joaquina",
        sobrenome: "Silva",
        endereco: "Rua das oliveiras, 834",
        saldo: 270.15
      },
      {
        id: 3,
        nome: "Arthur",
        sobrenome: "Goulart",
        endereco: "Rua santiago, 100",
        saldo: 11.31
      },
      {
        id: 4,
        nome: "Ricardo",
        sobrenome: "Ohara",
        endereco: "Rua manaus, 10",
        saldo: 60.05
      },
      {
        id: 5,
        nome: "Julia",
        sobrenome: "Lima",
        endereco: "Rua das conchas, 535",
        saldo: 2600.98
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('contas', null, {});
  }
};
