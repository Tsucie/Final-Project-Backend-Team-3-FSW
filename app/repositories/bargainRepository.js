const { Bargain, user, Product } = require("../models");

module.exports = {
  // Untuk daftar produk yang ditawar oleh pembeli
  findListsUserBargain(user_id) {
    return Bargain.findAll({
      where: {
        user_id,
        status: 1,
      },
      include: [ user, Product ],
    });
  },
  findById(id) {
    return Bargain.findOne({
      where: {
        id,
        status: 1,
      },
      include: [ user, Product ],
    });
  },
  create(data) {
    return Bargain.create(data);
  },
  update(id, data) {
    return Bargain.update(data, { where: { id }, returning: true, plain: true });
  },
  delete(id) {
    return Bargain.update({ status: 0, deletedAt: new Date() }, { where: { id } });
  },
};