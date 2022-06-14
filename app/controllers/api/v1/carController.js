const carService = require("../../../services/carService");

module.exports = {
  async list(req, res) {
    try {
      const date = req.query.date;
      const time = req.query.time;
      const passenger = req.query.passenger;

      const car = await carService.filter(date, time, passenger);
      if (car.length === 0) {
        res
          .status(404)
          .json({ message: "Cars are empty, please insert the data" });
        return;
      }
      res.status(200).json({
        status: "OK",
        ...car,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
