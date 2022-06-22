const productRepository = require("../repositories/productRepository");

module.exports = {
  async findAll(filter, offset = 0, limit = 25) {
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
      let { count, rows } = await productRepository.findAllPartially(filter);
      return {
        data: rows,
        total: count,
        offset: offset,
        limit: limit
      }
    } catch (error) {
      throw error;
    }
  },
  async findById(id) {
    return productRepository.findById(id);
  },
  async create({  }) {
    
  }
}