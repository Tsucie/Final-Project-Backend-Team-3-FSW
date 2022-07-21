/* eslint-disable no-useless-catch */
const productRepository = require("../repositories/productRepository");
const { Op } = require("sequelize");

module.exports = {
  async findAllPartially(user_id, filter, offset = 0, limit = 25) {
    try {
      let condition = new Object({
        where: {
          [Op.and]: [
            {
              user_id: { [Op.ne]: user_id }
            },
            {
              status: { [Op.or]: [1, 2] },
            },
          ],
        },
        offset: offset,
        limit: limit,
      });
      if (filter) {
        condition.where.category_id = filter;
        console.log(condition);
      }
      let { count, rows } = await productRepository.findAllPartially(condition);
      return {
        rows,
        count,
        offset,
        limit,
      };
    } catch (error) {
      throw error;
    }
  },

  async findById(id) {
    return productRepository.findById(id);
  },
  async findByIdStat(id) {
    return productRepository.findByIdStat(id);
  },
  async findByIdSeller(user_id) {
    try {
      return await productRepository.findByIdSeller(user_id);
    } catch (err) {
      throw err;
    }
  },
  async listByStatus(user_id, status) {
    try {
      return await productRepository.findByStatus(user_id, status);
    } catch (err) {
      throw err;
    }
  },
  async getByName(name) {
    return productRepository.findByName(name);
  },
  async create(data) {
    return productRepository.create(data);
  },
  async update(id, data) {
    return productRepository.update(id, data);
  },
  async delete(id) {
    return productRepository.delete(id);
  },
};
