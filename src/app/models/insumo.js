import Sequelize, { Model } from 'sequelize';

class insumo extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nome_insumo: Sequelize.STRING,
      unidade: Sequelize.STRING,
      preco: Sequelize.STRING,
      descricao: Sequelize.TEXT,
      categoria: Sequelize.STRING,
    },
      {
        sequelize,
        timestamps: false
      }
    )

    return this;
  }

  static associate(models) {
  }
}

export default insumo;