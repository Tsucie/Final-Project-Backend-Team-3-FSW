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
  delete(email) {
    return user.destroy({ where: { email } });
  },
  update(id, data) {
    return user.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
    });
  },
};
