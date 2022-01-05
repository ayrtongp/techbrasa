import Sequelize, { Model } from 'sequelize';

class produto_insumo extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      produto_id: Sequelize.INTEGER,
      insumo_id: Sequelize.INTEGER,
      insumo_quantidade: Sequelize.DOUBLE,
    },
      {
        sequelize,
        timestamps: false
      }
    )

    return this;
  }

  static associate(models) {
    this.belongsTo(models.insumo, { foreignKey: 'insumo_id', as: 'insumo'})
    this.belongsTo(models.produto, { foreignKey: 'produto_id', as: 'produto'})
  }
}

export default produto_insumo;