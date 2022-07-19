const { Product, user, ProductCategory } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  findAllPartially(filter) {
    return Product.findAndCountAll(filter);
  },
  findById(id) {
    return Product.findOne({
      where: {
        id,
        status: 1,
      },
      include: [user, ProductCategory],
    });
  },
  findByIdStat(id) {
    return Product.findByPk(id, { include: user, ProductCategory });
  },
  findByName(name) {
    return Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        status: 1,
      },
    });
  },
  findByIdSeller(user_id) {
    return Product.findAll({
      where: {
        user_id,
      },
    });
  },
  findByStatus(user_id, status) {
    return Product.findAll({
      where: {
        [Op.and]: [{ user_id: user_id }, { status }],
      },
    });
  },
  create(data) {
    return Product.create(data);
  },
  update(id, data) {
    return Product.update(data, { where: { id }, returning: true, plain: true });
  },
  delete(id) {
    return Product.destroy({ where: { id } });
  },
};
