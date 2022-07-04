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
      },
      include: [ user, ProductCategory ]
    });
  },
  findByName(name) {
    return Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
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
