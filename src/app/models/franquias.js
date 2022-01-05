import Sequelize, { Model } from 'sequelize';

class produto extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      nome: Sequelize.STRING,
      franquia: Sequelize.STRING,
      cidade: Sequelize.STRING,
      estado: Sequelize.STRING,
      ativa: Sequelize.BOOLEAN,
      id_usuario_master: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    },
      {
        sequelize,
        timestamps: true,
      }
    )

    return this;
  }

  static associate(models) {
  }
}

export default produto;