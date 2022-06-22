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
    return Product.update(data, { where: { id }});
  },
  delete(id) {
    return Product.destroy({ where: { id }});
  }
}