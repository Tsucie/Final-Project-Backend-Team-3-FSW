const productCategoryService = require('../../../services/productCategoryService');

module.exports = {
  getAll(req, res) {
    productCategoryService.findAll()
      .then((result) => {
        res.status(200).json({
          status: "OK",
          data: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "INTERNAL SERVER ERROR",
          message: error.message
        });
      });
  },
  getById(req, res) {
    productCategoryService.findById(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(404).json({
            status: "NOT FOUND",
            message: "Product category not found",
          });
        }
        else {
          res.status(200).json({
            status: "OK",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "INTERNAL SERVER ERROR",
          message: error.message
        });
      });
  },
  create(req, res) {
    productCategoryService.create(req.body)
      .then((result) => {
        res.status(201).json({
          status: "OK",
          data: result,
        });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "INTERNAL SERVER ERROR",
          message: error.message
        });
      });
  },
  edit(req, res) {
    productCategoryService.update(req.params.id, req.body)
      .then((result) => {
        if (!result) {
          res.status(404).json({
            status: "NOT FOUND",
            message: "Product category not found",
          });
        }
        else {
          res.status(200).json({
            status: "OK",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "INTERNAL SERVER ERROR",
          message: error.message
        });
      });
  },
  delete(req, res) {
    productCategoryService.delete(req.params.id)
      .then((result) => {
        if (!result) {
          res.status(404).json({
            status: "NOT FOUND",
            message: "Product category not found",
          });
        }
        else {
          res.status(200).json({
            status: "OK",
            data: result,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({
          status: "INTERNAL SERVER ERROR",
          message: error.message
        });
      });
  }
}