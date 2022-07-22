// const { Notification, Product, Bargain, user } = require("../models");

// module.exports = {
//   findAllByUser(user_id) {
//     return Notification.findAll({
//       where: {
//         user_id,
//         status: 1,
//       },
//       include: [ user, Bargain, Product ],
//     });
//   },
//   findById(id) {
//     return Notification.findOne({
//       where: {
//         id,
//         status: 1,
//       },
//       include: [ user, Bargain, Product ],
//     });
//   },
//   create(data) {
//     return Notification.create(data);
//   },
//   update(id, data) {
//     return Notification.update(data, { where: { id }, returning: true, plain: true });
//   },
//   delete(id) {
//     return Notification.update({ status: 0, deletedAt: new Date() }, { where: { id } });
//   }
// };
