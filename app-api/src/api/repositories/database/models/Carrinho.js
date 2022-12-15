'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Carrinho extends Model {
        static associate(models) {
            this.hasMany(models.Produto, {
                foreignKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.belongsTo(models.Conta, {
                foreignKey: 'idConta',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Carrinho.init({ 
        quantidade: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize: sequelize,
        tableName: 'carrinhos',
        modelName: 'Carrinho',
    });

    return Carrinho;
}