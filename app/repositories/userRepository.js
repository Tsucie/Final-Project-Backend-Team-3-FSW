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
};
