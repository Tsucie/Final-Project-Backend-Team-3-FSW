const productRepository = require("../repositories/productRepository");

module.exports = {
  async findAllPartially(filter, offset = 0, limit = 25) {
    try {
      let condition = new Object({
        where: {
          status: 1,
        },
        offset: offset,
        limit: limit
      });
      if (filter) {
        condition.where.category_id = filter
        console.log(condition);
      }
      let { count, rows } = await productRepository.findAllPartially(condition);
      return {
        rows,
        count,
        offset,
        limit
      }
    } catch (error) {
      throw error;
    }
  },
  async findById(id) {
    return productRepository.findById(id);
  },
  async create(data) {
    return productRepository.create(data);
  },
  async update(id, data) {
    return productRepository.update(id, data);
  },
  async delete(id) {
    return productRepository.delete(id);
  }
}