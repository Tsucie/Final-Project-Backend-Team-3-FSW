const bargaiRepository = require("../repositories/bargainRepository");

module.exports = {
  async findAllByUser(user_id) {
    return bargaiRepository.findListsUserBargain(user_id);
  },
  async findById(id) {
    return bargaiRepository.findById(id);
  },
  async create(data) {
    return bargaiRepository.create(data);
  },
  async update(id, data) {
    return bargaiRepository.update(id, data);
  },
  async delete(id) {
    return bargaiRepository.delete(id);
  }
};