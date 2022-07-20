const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  getByBuyer(user_id) {
    return transactionRepository.findByBuyer(user_id);
  },
  getBySeller(user_id) {
    return transactionRepository.findBySeller(user_id);
  },
  create(data) {
    return transactionRepository.create(data);
  },
  updateStatus(id, status) {
    return transactionRepository.updateStatus(id, status);
  },
  updateAllStatus(product, transaction) {
    return transactionRepository.updateTransactionAndProductStatus(product, transaction);
  },
  updateSold(product_id) {
    return transactionRepository.updateProductSold(product_id);
  },
  delete(id) {
    return transactionRepository.delete(id);
  }
};