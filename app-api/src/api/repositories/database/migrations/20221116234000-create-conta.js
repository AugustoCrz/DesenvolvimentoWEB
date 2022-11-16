'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      sobrenome: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.STRING
      },
      saldo: {
        type: Sequelize.DOUBLE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contas');
  }
};
