import Sequelize, { Model } from 'sequelize';

class categoria extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nome_categoria: Sequelize.STRING,
      mostra_categoria: Sequelize.INTEGER,
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

export default categoria;