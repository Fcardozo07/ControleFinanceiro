import { Sequelize, Model } from "sequelize";
import bcrypt from 'bcryptjs';

export default class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        senha: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 200],
              msg: 'A senha precisa ter entre 6 e 50 caracteres',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'usuarios',
      }
    );

    // 👇 Hook dentro do init
    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.password_hash = await bcrypt.hash(usuario.senha, 8);
      }
    });

    return this;
  }
}
