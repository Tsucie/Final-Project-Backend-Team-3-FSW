"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car.init(
    {
      plate: DataTypes.STRING,
      manufacture: DataTypes.STRING,
      model: DataTypes.STRING,
      image: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("image");
          return rawValue
            ? "https://challenge-7-team-1-backend.herokuapp.com" +
                rawValue.substring(1)
            : null;
        },
      },
      rent_per_day: DataTypes.INTEGER,
      capacity: DataTypes.INTEGER,
      description: DataTypes.STRING,
      available_at: DataTypes.DATE,
      transmission: DataTypes.STRING,
      available: DataTypes.BOOLEAN,
      type: DataTypes.STRING,
      year: DataTypes.INTEGER,
      option: DataTypes.ARRAY(DataTypes.STRING),
      specs: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "car",
    }
  );
  return car;
};
