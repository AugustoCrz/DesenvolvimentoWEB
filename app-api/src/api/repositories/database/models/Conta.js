'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Conta extends Model {
        static associate(models) {
            this.hasMany(models.Transferencia, {
                foreignKey: 'identificador',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Conta.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sobrenome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        saldo: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
        sequelize: sequelize,
        tableName: 'contas',
        modelName: 'Conta',
    });

    return Conta;
}