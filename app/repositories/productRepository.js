const { Product } = require("../models");

module.exports = {
  findAllPartially(filter) {
    return Product.findAndCountAll(filter);
  },
  findById(id) {
    return Product.findByPk(id);
  },
  create(data) {
    return Product.create(data);
  },
  update(id, data) {
    return Product.update(data, { where: { id }, returning: true, plain: true });
  },
  delete(id) {
    return Product.update({ status: 0, deletedAt: new Date() }, { where: { id }});
  }
}