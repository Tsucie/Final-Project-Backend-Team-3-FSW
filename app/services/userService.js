const userRepository = require("../repositories/userRepository");

module.exports = {
  async findByEmail(email) {
    return userRepository.findByEmail(email);
  },
  async create(data) {
    return userRepository.create(data);
  },
  async findById(id) {
    return userRepository.findById(id);
  },
  async update(id, data) {
    return userRepository.update(id, data);
  }
};
