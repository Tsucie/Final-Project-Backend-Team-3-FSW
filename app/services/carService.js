const carRepository = require("../repositories/carRepository");

module.exports = {
  async list() {
    try {
      const car = await carRepository.findAll();

      return {
        car,
      };
    } catch (err) {
      throw err;
    }
  },

  async filter(date, time, passenger) {
    try {
      const car = await carRepository.filter(date, time, passenger);

      return {
        car,
      };
    } catch (err) {
      throw err;
    }
  },
};
