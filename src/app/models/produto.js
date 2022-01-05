import Sequelize, { Model } from 'sequelize';

class produto extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nome_produto: Sequelize.STRING,
      categoria: Sequelize.STRING,
      preco_venda: Sequelize.DOUBLE,
      descricao: Sequelize.TEXT,
      id_franqueado: Sequelize.INTEGER,
      img_path: Sequelize.TEXT,
      mostra_produto: Sequelize.TEXT,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
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

export default produto;