const bargainService = require("../../../services/bargainService");

module.exports = {
  async getList(req, res) {
    try {
      let { user_id } = req.query;
      if (!user_id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let bargains = await bargainService.findAllByUser(user_id);
      return res.status(200).json({ status: "OK", data: bargains });
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
      let bargain = await bargainService.findById(req.params.id);
      if (!bargain) {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
      return res.status(200).json({ status: "OK", data: bargain });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async create(req, res) {
    try {
      let { user_id, product_id, price } = req.body;
      if (!user_id || !product_id || !price) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let newBargain = {
        user_id,
        product_id,
        price,
        result: null,
        status: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const addedBargain = await bargainService.create(newBargain);
      return res.status(201).json({
        status: "CREATED",
        message: "Data penawaran berhasil ditambahkan",
        data: addedBargain,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async edit(req, res) {
    try {
      let { price, result } = req.body;
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      const updatedBargain = await bargainService.update(req.params.id, {
        price, result, updatedAt: new Date()
      });
      return res.status(201).json({
        status: "UPDATED",
        message: "Data penawaran berhasil diubah",
        data: updatedBargain[1],
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      await bargainService.delete(req.params.id);
      return res.status(202).json({ status: "ACCEPTED", message: "Data berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  }
};