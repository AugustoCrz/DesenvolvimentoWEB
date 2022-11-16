const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Acao extends Model {

    }

    Acao.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tipo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        valor: {
            type: DataTypes.DOUBLE,
            defaultValue: 0
        }
    }, {
        sequelize: sequelize,
        tableName: 'acoes',
        modelName: 'Acao',
    });

    return Acao;
}