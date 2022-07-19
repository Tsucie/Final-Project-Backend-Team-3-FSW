const productService = require("../../../services/productService");
const { promisify } = require("util");
const cloudinary = require("../../../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);

module.exports = {
  async getAllPartial(req, res) {
    try {
      let { filter, offset, limit } = req.query;
      let products = await productService.findAllPartially(filter, offset, limit);
      return res.status(200).json({ status: "OK", data: products });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
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
        message: error.message,
      });
    }
  },
  async getByIdWithoutStatus(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      let product = await productService.findByIdStat(req.params.id);
      if (!product) {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
      return res.status(200).json({ status: "OK", data: product });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async getProductsByStatus(req, res) {
    try {
      if (req.query.status === 1 && req.query.status === 2 && req.query.status === 3) {
        productService
          .findByIdSeller(req.query.user_id)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json({
              error: err.message,
            });
          });
      } else {
        productService
          .listByStatus(req.query.user_id, req.query.status)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json({
              error: err.message,
            });
          });
      }
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  },
  async getProductByName(req, res) {
    try {
      let name = req.query.name.toLowerCase();
      let products = await productService.getByName(name);
      console.log(name);
      return res.status(200).json({ status: "OK", data: products });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
  async create(req, res) {
    try {
      let { category_id, user_id, name, price, description } = req.body;
      if (!category_id || !user_id || !name || !price) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      console.log(req.file);
      let newProduct = new Object();
      newProduct.category_id = category_id;
      newProduct.user_id = user_id;
      newProduct.name = name;
      newProduct.price = price;
      if (description) {
        newProduct.description = description;
      }
      newProduct.is_sold = false;
      newProduct.status = 1;
      newProduct.photos = [];
      // Handle product photos
      if (req.files !== undefined) {
        // Upload setiap foto baru
        for (const file of req.files) {
          const fileBase64 = file.buffer.toString("base64");
          const fileUpload = `data:${file.mimetype};base64,${fileBase64}`;
          const result = await cloudinaryUpload(fileUpload);
          const url = result.secure_url;
          newProduct.photos.push(url);
        }
      }
      const addedProduct = await productService.create(newProduct);
      return res.status(201).json({
        status: "CREATED",
        message: "Data produk berhasil ditambahkan",
        data: addedProduct,
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },

  async edit(req, res) {
    try {
      let { category_id, name, price, description, status } = req.body;
      if (!req.params.id) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      const product = JSON.parse(JSON.stringify(await productService.findById(req.params.id)));
      let newProduct = new Object();
      if (category_id) newProduct.category_id = category_id;
      if (name) newProduct.name = name;
      if (price) newProduct.price = price;
      if (description) newProduct.description = description;
      if (status) newProduct.status = status;
      // Handle product photos
      if (req.files !== undefined) {
        // Hapus photo lama
        if (product.photos && product.photos.length > 0) {
          for (const photo of product.photos) {
            const oldImage = photo.substring(65, 85);
            await cloudinaryDestroy(oldImage);
          }
        }
        // Upload setiap foto baru
        newProduct.photos = [];
        for (const file of req.files) {
          const fileBase64 = file.buffer.toString("base64");
          const fileUpload = `data:${file.mimetype};base64,${fileBase64}`;
          const result = await cloudinaryUpload(fileUpload);
          const url = result.secure_url;
          newProduct.photos.push(url);
        }
      }
      const updatedProduct = await productService.update(req.params.id, newProduct);
      return res.status(201).json({
        status: "CREATED",
        message: "Data produk berhasil diubah",
        data: updatedProduct[1],
      });
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
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
        // Delete all related photos in public folder
        if (product.photos && product.photos.length > 0) {
          for (const photo of product.photos) {
            const oldImage = photo.substring(65, 85);
            await cloudinaryDestroy(oldImage);
          }
        }
        await productService.delete(req.params.id);
        return res.status(202).json({ status: "ACCEPTED", message: "Data berhasil dihapus" });
      } else {
        return res.status(404).json({ status: "NOT FOUND", message: "Data tidak ditemukan" });
      }
    } catch (error) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: error.message,
      });
    }
  },
};
