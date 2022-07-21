const { Transaction, Product, user } = require("../models");
const { Op } = require("sequelize");
const productStatus = require("../../utilities/productstatusenum");
const transactionStatus = require("../../utilities/transactionstatusenum");

module.exports = {
  findByBuyer(user_id) {
    return Transaction.findAll({
      include: [
        { model: Product },
        { model: user },
      ],
      where: { user_id },
    });
  },
  findBySeller(user_id) {
    return Transaction.findAll({
      include: [
        { model: Product, where: { user_id } },
        { model: user },
      ],
      where: {
        status: {
          [Op.or]: [transactionStatus.Waiting, transactionStatus.Processed],
        },
      },
    });
  },
  async create(data) {
    await Product.update({
      status: productStatus.Offered,
      updatedAt: new Date(),
    }, {
      where: {
        id: data.product_id,
      },
      returning: true,
      plain: true
    });
    return await Transaction.create(data);
  },
  updateStatus(id, status) {
    return Transaction.update({
      status,
      updatedAt: new Date()
    }, { 
      where: { id }, 
      returning: true, 
      plain: true, 
    });
  },
  async updateTransactionAndProductStatus(product, transaction) {
    await Product.update({ 
      status: product.status, 
      updatedAt: new Date(),
    }, {
      where: { id: product.id },
      returning: true,
      plain: true
    });
    return await Transaction.update({
      status: transaction.status,
      updatedAt: new Date(),
    }, {
      where: {
        id: transaction.id,
      },
      returning: true,
      plain: true
    });
  },
  updateProductSold(product_id) {
    Transaction.update({ status: transactionStatus.Rejected }, { where: { product_id }});  
  },
  delete(id) {
    return Transaction.destroy({where: {id}});
  }
};