const { Product, user, ProductCategory } = require("../models");
const { Op } = require("sequelize");
module.exports = {
  findAllPartially(filter) {
    return Product.findAndCountAll(filter);
  },
  findById(id) {
    return Product.findOne({
      where: {
        [Op.and]: [
          {
            id: { [Op.eq]: id },
          },
          {
            status: { [Op.or]: [1, 2] },
          },
        ],
      },
      include: [user, ProductCategory],
    });
  },
  findByIdStat(id) {
    return Product.findOne({
      where: {
        [Op.and]: [
          {
            id: { [Op.eq]: id },
          },
          {
            status: { [Op.or]: [1, 2, 3] },
          },
        ],
      },
      include: [user, ProductCategory],
    });
  },
  findByName(name) {
    return Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
        status: {
          [Op.or]: [1, 2],
        },
      },
    });
  },
  findByIdSeller(user_id) {
    return Product.findAll({
      where: {
        [Op.and]: [
          {
            user_id: { [Op.eq]: user_id },
          },
          {
            status: { [Op.or]: [1, 2, 3] },
          },
        ],
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
    return Product.update({ status: 0, deletedAt: new Date() }, { where: { id } });
  },
};
