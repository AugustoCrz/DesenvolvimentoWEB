'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carrinhos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      quantidade: {
        type: Sequelize.INTEGER
      },
      idProduto: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'produtos',
          key: 'id'
        }
      },
      idConta: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        references: {
          model: 'contas',
          key: 'id'
        }
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carrinhos');
  }
};
