"use strict";
const { Model } = require("sequelize");
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
      Transaction.belongsTo(models.Product, { foreignKey: "product_id" });
    }
  }
  Transaction.init(
    {
      user_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      deal_price: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
