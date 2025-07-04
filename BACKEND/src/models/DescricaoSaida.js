import {Sequelize, Model} from 'sequelize';

export default class DescricaoSaida extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            descricaoSaida: {
                type: Sequelize.STRING,
                allowNull: false
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'id_usuario'
            },
        
        }, {
            sequelize,
            tableName: 'descricaosaida',
            timestamps: true,
            createdAt: 'created_at',  // aqui ok, pq no banco é com underline
            updatedAt: 'updated_at',
            underscored: false, // importante: não converte camelCase para snake_case
        });
    }
        associate(models) {
            this.belongsTo(models.Saida, { foreignKey: 'id_descricaoSaida', as: 'descricaoSaida' });
        }
}
