const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async getByBuyer(user_id) {
    return transactionRepository.findByBuyer(user_id);
  },
  async getBySeller(user_id) {
    return transactionRepository.findBySeller(user_id);
  },
  async create(data) {
    return transactionRepository.create(data);
  },
  async updateStatus(id, status) {
    return transactionRepository.updateStatus(id, status);
  },
  async updateAllStatus(product, transaction) {
    return transactionRepository.updateTransactionAndProductStatus(product, transaction);
  },
  async updateSold(product_id) {
    return transactionRepository.updateProductSold(product_id);
  },
  async delete(id) {
    return transactionRepository.delete(id);
  },
};
