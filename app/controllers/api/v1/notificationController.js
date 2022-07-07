const notificationService = require("../../../services/notificationService");

module.exports = {
  async getList(req, res) {
    try {
      let { user_id } = req.query;
      if (!user_id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let notifications = await notificationService.findAllByUser(user_id);
      return res.status(200).json({ status: "OK", data: notifications });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async getById(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let notification = await notificationService.findById(req.params.id);
      if (!notification) {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
      return res.status(200).json({ status: "OK", data: notification });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  }
};