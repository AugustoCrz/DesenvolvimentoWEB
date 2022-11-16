const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Loja extends Model {
        static associate(models) {
            this.hasMany(models.Produto, {
                foreignKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
            this.belongsTo(models.Conta, {
                foreignKey: 'id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Loja.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        vendas: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        saldo: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        sequelize: sequelize,
        tableName: 'lojas',
        modelName: 'Loja',
    });

    return Loja;
}