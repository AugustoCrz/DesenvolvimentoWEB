'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Produto extends Model {
        static associate(models) {
            this.belongsTo(models.Loja, {
                foreignKey: 'idLoja',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Produto.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantidade: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        categoria: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        tableName: 'produtos',
        modelName: 'Produto',
    });

    return Produto;
}