import { Sequelize, Model } from 'sequelize';

export default class Conta extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false
      },
      valorTotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
        // Não precisa colocar 'field' se o nome no banco for igual 'valorTotal'
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'id_usuario'
        
      },

    }, {
      sequelize,
      tableName: 'contas',
      timestamps: true,
      createdAt: 'created_at',  // aqui ok, pq no banco é com underline
      updatedAt: 'updated_at',
      underscored: false, // importante: não converte camelCase para snake_case
    });
  }
}
