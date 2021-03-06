'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.ProductCategory, { foreignKey: "category_id" });
      Product.belongsTo(models.user, { foreignKey: "user_id" });
      Product.hasMany(models.Notification, { foreignKey: "product_id" });
      Product.hasMany(models.Transaction, { foreignKey: "product_id" });
    }
  }
  Product.init({
    category_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    photos: DataTypes.ARRAY(DataTypes.STRING),
    price: DataTypes.BIGINT,
    description: DataTypes.TEXT,
    status: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};