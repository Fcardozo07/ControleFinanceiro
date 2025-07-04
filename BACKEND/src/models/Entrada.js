import {Sequelize, Model} from 'sequelize';

export default class Entrada extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_conta: {
                type: Sequelize.INTEGER,
                allowNull: false,
          
            },
            id_descricaoEntrada: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'id_descricaoEntrada'
            
            },
            valorItem: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                field: 'valorItem'
            },
            pago: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'id_usuario'
            },
      

        }, {
            sequelize,
            tableName: 'entrada',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
        associate(models) {
            this.belongsTo(models.Conta, { foreignKey: 'id_conta', as: 'conta' });
            this.belongsTo(models.DescricaoEntrada, { foreignKey: 'id_descricaoEntrada', as: 'entrada' });
        }
}

