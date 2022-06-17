"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.typeUser, { foreignKey: "type_id" });
      user.hasMany(models.Product, { foreignKey: "user_id" });
      user.hasMany(models.Wishlist, { foreignKey: "user_id" });
      user.hasMany(models.Bargain, { foreignKey: "user_id" });
      user.hasMany(models.Notification, { foreignKey: "user_id" });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      encryptedPassword: DataTypes.STRING,
      type_id: DataTypes.INTEGER,
      googleId: DataTypes.STRING,
      registeredVia: DataTypes.STRING,
      photo: DataTypes.STRING,
      contact: DataTypes.STRING,
      city: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
