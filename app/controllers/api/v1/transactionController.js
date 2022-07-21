const transactionService = require("../../../services/transactionService");
const transactionStatus = require("../../../../utilities/transactionstatusenum");
const productStatus = require("../../../../utilities/productstatusenum");
const jwt = require("jsonwebtoken");
const config = require("../../../../config/appconfig");

module.exports = {
  async getListByIdBuyer(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      // eslint-disable-next-line no-undef
      const tokenPayload = jwt.verify(token, config.app.jwt_secret_key);
      if (!tokenPayload.id) {
        return res.status(403).json({ status: "FORBIDDEN", message: "ID kosong" });
      }
      let buys = await transactionService.getByBuyer(tokenPayload.id);
      return res.status(200).json({
        status: "TRANSACTION_BUYS",
        message: "Data pembelian",
        data: buys,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async getListByIdSeller(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      // eslint-disable-next-line no-undef
      const tokenPayload = jwt.verify(token, config.app.jwt_secret_key);
      if (!tokenPayload.id) {
        return res.status(403).json({ status: "FORBIDDEN", message: "ID kosong" });
      }
      console.log(tokenPayload.id);
      let sells = await transactionService.getBySeller(tokenPayload.id);
      return res.status(200).json({
        status: "TRANSACTION_SELLS",
        message: "Data penjualan",
        data: sells,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async create(req, res) {
    try {
      let { user_id, product_id, deal_price } = req.body;
      if (!user_id || !product_id || !deal_price) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let created = await transactionService.create({
        user_id,
        product_id,
        deal_price,
        status: transactionStatus.Waiting,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      if (!created) throw new Error("Gagal update data produk");
      return res.status(201).json({
        status: "CREATED",
        message: "Data transaksi berhasil dibuat",
        data: created,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async update(req, res) {
    try {
      let { status } = req.body;
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let updated = await transactionService.updateStatus(req.params.id, status);
      return res.status(201).json({
        status: "UPDATED",
        message: "Transaction data has updated",
        data: updated,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async updateStatus(req, res) {
    try {
      let { id, status, product_id, product_status } = req.body;
      if (!id || !status || !product_id || !product_status) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      if (product_status === productStatus.Sold) {
        transactionService.updateSold(product_id);
      } else {
        let result = await transactionService.updateAllStatus({ id: product_id, status: productStatus }, { id, status });
        if (!result) throw new Error("Failed update Product Data");
      }
      return res.status(201).json({
        status: "ALL UPDATED",
        message: "Transaction data has updated",
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
      await transactionService.delete(req.params.id);
      return res.status(202).json({ status: "ACCEPTED", message: "Data berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
};
