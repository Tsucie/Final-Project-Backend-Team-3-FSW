const { ProductCategory } = require('../models');

module.exports = {
  findAll() {
    return ProductCategory.findAll();
  },
  findById(id) {
    return ProductCategory.findByPk(id);
  },
  create(data) {
    return ProductCategory.create(data);
  },
  update(id, data) {
    return ProductCategory.update(data, { where: { id }});
  },
  delete(id) {
    return ProductCategory.destroy({ where: { id }});
  }
}