const { user } = require("../models");

module.exports = {
  findByEmail(email) {
    return user.findOne({
      where: {
        email,
      },
    });
  },
  create(data) {
    return user.create(data);
  },
  findById(id) {
    return user.findByPk(id);
  },
  update(id, data) {
    return user.update(data, {
      where: {
        id,
      },
    });
  }
};
