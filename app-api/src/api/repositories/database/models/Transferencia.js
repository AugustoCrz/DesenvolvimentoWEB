const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transferencia extends Model {
        static associate(models) {
            this.belongsTo(models.Conta, {
                foreignKey: 'identificador',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            })
        }
    }

    Transferencia.init({
        data: { // A hora da transação
            type: DataTypes.DATE,
            allowNull: false
        },
        conta: { // A conta que enviou o valor
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        conta_alvo: { // A conta que recebeu o valor
            type: DataTypes.INTEGER,
            allowNull: false
        },
        valor: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize: sequelize,
        tableName: 'transferencias',
        modelName: 'Transferencia',
    });

    return Transferencia;
}