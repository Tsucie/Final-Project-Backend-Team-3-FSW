const { car } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  findAll() {
    return car.findAll();
  },

  getTotalCar() {
    return car.count();
  },

  filter(date, time, passenger) {
    return car.findAll({
      where: {
        [Op.and]: {
          available: true,
          available_at: {
            [Op.lte]: date + " " + time,
          },
          capacity: {
            [Op.gte]: passenger,
          },
        },
      },
    });
  },
};
