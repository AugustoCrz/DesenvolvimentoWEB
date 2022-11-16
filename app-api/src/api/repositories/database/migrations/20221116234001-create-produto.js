'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      quantidade: {
        type: Sequelize.STRING
      },
      idLoja: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'lojas',
          key: 'id'
        }
      },
      categoria: {
        type: Sequelize.STRING
      },
      valor: {
        type: Sequelize.DOUBLE
      }
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtos');
  }
};
