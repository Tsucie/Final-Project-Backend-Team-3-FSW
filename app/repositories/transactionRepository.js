const { Transaction, Product, users } = require("../models");
const { Op } = require("sequelize");
const productStatus = require("../../utilities/productstatusenum");
const transactionStatus = require("../../utilities/transactionstatusenum");

module.exports = {
  findByBuyer(user_id) {
    return Transaction.findAll({
      include: [
        { model: Product },
        { model: users },
      ],
      where: { user_id },
    });
  },
  findBySeller(user_id) {
    return Transaction.findAll({
      include: [
        { model: Product, where: { user_id } },
        { model: users },
      ],
      where: { status: {
        [Op.or]: [transactionStatus.Waiting, transactionStatus.Processed],
      }},
    });
  },
  async create(data) {
    let upRow = await Product.update({
      status: productStatus.Offered,
      updatedAt: new Date(),
    }, {
      where: {
        id: data.product_id,
      },
      returning: true,
      plain: true
    });
    if (upRow.id) return await Transaction.create(data);
    else return false;
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
    let upRow = await Product.update({ 
      status: product.status, 
      updatedAt: new Date(),
    }, {
      where: { id: product.id },
      returning: true,
      plain: true
    });
    if (upRow.id) return await Transaction.update({
      status: transaction.status,
      updatedAt: new Date(),
    }, {
      where: {
        id: transaction.id,
      },
      returning: true,
      plain: true
    });
    else return false;
  },
  updateProductSold(product_id) {
    Transaction.update({ status: transactionStatus.Rejected }, { where: { product_id }});  
  },
  delete(id) {
    return Transaction.destroy({where: {id}});
  }
};