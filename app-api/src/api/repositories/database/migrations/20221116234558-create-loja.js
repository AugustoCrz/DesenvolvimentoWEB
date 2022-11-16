'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lojas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      vendas: {
        type: Sequelize.INTEGER
      },
      saldo: {
        type: Sequelize.DOUBLE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lojas');
  }
};
