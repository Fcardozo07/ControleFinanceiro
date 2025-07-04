import {Sequelize, Model} from 'sequelize';

export default class Saida extends Model {
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
            id_descricaoSaida: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'id_descricaoSaida'
            
            },
            valorItem: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false,
                field: 'valorItem'
            },
            pago: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            id_usuario: {
                type: Sequelize.INTEGER,
                allowNull: false,
                field: 'id_usuario'
            },
      


        }, {
           
            sequelize,
            tableName: 'saida',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        });
    }
     
}

