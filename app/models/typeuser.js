"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class typeUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      typeUser.hasMany(models.user, { foreignKey: "type_id" });
    }
  }
  typeUser.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "typeUser",
    }
  );
  return typeUser;
};
