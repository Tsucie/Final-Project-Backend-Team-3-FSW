'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.user, { foreignKey: "user_id" });
      Transaction.belongsTo(models.Bargain, { foreignKey: "bargain_id" });
    }
  }
  Transaction.init({
    user_id: DataTypes.INTEGER,
    bargain_id: DataTypes.INTEGER,
    deal_price: DataTypes.INTEGER,
    tax_percent: DataTypes.INTEGER,
    tax_nominal: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    payment_method: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};