// const notificationService = require("../../../services/notificationService");

// module.exports = {
//   async getList(req, res) {
//     try {
//       let { user_id } = req.query;
//       if (!user_id) {
//         return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
//       }
//       let notifications = await notificationService.findAllByUser(user_id);
//       return res.status(200).json({ status: "OK", data: notifications });
//     } catch (error) {
//       return res.status(500).json({
//         status: "INTERNAL SERVER ERROR",
//         message: error.message,
//       });
//     }
//   },
//   async getById(req, res) {
//     try {
//       if (!req.params.id) {
//         return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
//       }
//       let notification = await notificationService.findById(req.params.id);
//       if (!notification) {
//         return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
//       }
//       return res.status(200).json({ status: "OK", data: notification });
//     } catch (error) {
//       return res.status(500).json({
//         status: "INTERNAL SERVER ERROR",
//         message: error.message,
//       });
//     }
//   },
//   async create(req, res) {
//     try {
//       let { user_id, bargain_id, product_id, message } = req.body;
//       if (!user_id || !message) {
//         return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
//       }
//       let newNotif = new Object();
//       newNotif.user_id = user_id;
//       if (bargain_id) newNotif.bargain_id = bargain_id;
//       if (product_id) newNotif.product_id = product_id;
//       newNotif.message = message;
//       newNotif.is_read = false;
//       newNotif.datetime = new Date();
//       newNotif.status = 1;
//       newNotif.createdAt = new Date();
//       newNotif.updatedAt = new Date();
//       await notificationService.create(newNotif);
//       return res.status(201).json({
//         status: "CREATED",
//         message: "Notifikasi berhasil ditambahkan"
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "INTERNAL SERVER ERROR",
//         message: error.message,
//       });
//     }
//   },
//   async update(req, res) {
//     try {
//       let { message, is_read } = req.body;
//       if (!req.params.id) {
//         return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
//       }
//       await notificationService.update(req.params.id, {
//         message, is_read, updatedAt: new Date()
//       });
//       return res.status(201).json({
//         status: "UPDATED",
//         message: "Notifikasi berhasil diubah"
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: "INTERNAL SERVER ERROR",
//         message: error.message,
//       });
//     }
//   },
//   async delete(req, res) {
//     try {
//       if (!req.params.id) {
//         return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
//       }
//       await notificationService.delete(req.params.id);
//       return res.status(202).json({ status: "ACCEPTED", message: "Data berhasil dihapus" });
//     } catch (error) {
//       return res.status(500).json({
//         status: "INTERNAL SERVER ERROR",
//         message: error.message,
//       });
//     }
//   }
// };
