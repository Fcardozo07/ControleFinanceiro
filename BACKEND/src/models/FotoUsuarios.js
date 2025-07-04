import { Sequelize, Model } from "sequelize";

export default class FotoUsuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ser vazio",
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo não pode ser vazio",
            },
          },
        },
        id_usuario: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "fotos_usuarios",
      }
    );
  }

  associate(models) {
    this.belongsTo(models.usuario, { foreignKey: "id_usuario" });
  }
}
