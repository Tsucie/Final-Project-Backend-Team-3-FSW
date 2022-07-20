const transactionRepository = require("../repositories/transactionRepository");

module.exports = {
  async findAll() {
    return transactionRepository.findAll();
  },

  async findById(id) {
    return transactionRepository.findById(id);
  },

  create(createArgs) {
    return transactionRepository.create(createArgs);
  },

  async update(id, data) {
    return transactionRepository.update(id, data);
  },

  async delete(id) {
    return transactionRepository.delete(id);
  },
};
