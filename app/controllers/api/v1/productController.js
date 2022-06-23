const productService = require("../../../services/productService");
const path = require("path");
const fs = require("fs");
const Resizer = require("../../../../utilities/Resizer");

const pathImgStore = path.join(__dirname, "/../../../../public/images/product");

module.exports = {
  async getAllPartial(req, res) {
    try {
      let { filter, offset, limit } = req.query;
      let products = await productService.findAllPartially(filter, offset, limit);
      return res.status(200).json({ status: "OK", data: products });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message
      });
    }
  },
  async getById(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let product = await productService.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
      return res.status(200).json({ status: "OK", data: product });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message
      });
    }
  },
  async create(req, res) {
    try {
      let { category_id, user_id, name, price, description } = req.body;
      if (!category_id || !user_id || !name || !price) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let newProduct = new Object();
      newProduct.category_id = category_id;
      newProduct.user_id = user_id;
      newProduct.name = name;
      newProduct.price = price;
      if (description) { newProduct.description = description; }
      newProduct.is_sold = false;
      newProduct.status = 1;
      newProduct.photo = [];
      // Handle product photos
      if (req.files !== undefined) {
        let i = 0;
        for (const file of req.files) {
          i++;
          const fileUpload = new Resizer(pathImgStore, `${name}_${i}`);
          const filename = await fileUpload.save(file.buffer);
          newProduct.push(filename);
        }
      }
      const addedProduct = await productService.create(newProduct);
      return res.status(201).json({
        status: "CREATED",
        message: "Data produk berhasil ditambahkan",
        data: addedProduct
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message
      });
    }
  },
  async edit(req, res) {
    try {
      let { category_id, name, price, description } = req.body;
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let newProduct = new Object();
      if (category_id) newProduct.category_id = category_id;
      if (name) newProduct.name = name;
      if (price) newProduct.price = price;
      if (description) newProduct.description = description;
      // Handle product photos
      if (req.files !== undefined) {
        let i = 0;
        newProduct.photo = [];
        for (const file of req.files) {
          i++;
          const fileUpload = new Resizer(pathImgStore, `${name}_${i}`);
          const filename = await fileUpload.save(file.buffer);
          newProduct.push(filename);
        }
      }
      const updatedProduct = await productService.update(req.params.id, newProduct);
      return res.status(201).json({
        status: "CREATED",
        message: "Data produk berhasil diubah",
        data: updatedProduct
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message
      });
    }
  },
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let product = await productService.findById(req.params.id);
      if (product) {
        // Delete all related photo in public folder
        if (product.photo && product.photo.length > 0) {
          product.photo.forEach(item => {
            let imgPath = path.join(pathImgStore, item);
            fs.unlinkSync(imgPath);
          });
        }
        await productService.delete(req.params.id);
        return res.status(202).json({ status: "ACCEPTED", message: "Data berhasil dihapus" });
      }
      else {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message
      });
    }
  }
}