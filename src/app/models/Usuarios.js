import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { password, username } from '../../config/database';

class Usuarios extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      nome: Sequelize.STRING,
      id_franquia: Sequelize.STRING,
      celular: Sequelize.STRING,
      ativo: Sequelize.BOOLEAN,
      e_colaborador: Sequelize.BOOLEAN,
      e_gerente: Sequelize.BOOLEAN,
      e_admin: Sequelize.BOOLEAN,

      password: Sequelize.VIRTUAL,
    },
      {
        sequelize,
        timestamps: true,
      }
    )

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.password) {
        usuario.password_hash = await bcrypt.hash(usuario.password, 8)
      }
    })

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Usuarios;