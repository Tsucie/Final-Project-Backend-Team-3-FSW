const productCategoryRepository = require('../repositories/productCategoryRepository');

module.exports = {
  async findAll() {
    return productCategoryRepository.findAll();
  },
  async findById(id) {
    return productCategoryRepository.findById(id);
  },
  async create(data) {
    return productCategoryRepository.create(data);
  },
  async update(id, data) {
    return productCategoryRepository.update(id, data);
  },
  async delete(id) {
    return productCategoryRepository.delete(id);
  }
}