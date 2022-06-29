const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");
const path = require("path");
const { promisify } = require("util");
const cloudinary = require("../../../../config/cloudinary");
const cloudinaryUpload = promisify(cloudinary.uploader.upload);
const cloudinaryDestroy = promisify(cloudinary.uploader.destroy);
const config = require("../../../../config/appconfig");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = await userService.findByEmail(email);
      if (user) {
        res.status(400).json({ message: "Email already exists" });
        return;
      }

      const newUser = await userService.create({
        email,
        encryptedPassword: hashedPassword,
        name: req.body.name,
        type_id: null,
        googleId: null,
        registeredVia: "application",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const user_data = JSON.parse(JSON.stringify(newUser));

      delete user_data.encryptedPassword;

      res.status(201).json({
        status: "CREATED",
        message: "Berhasil registrasi akun",
        data: user_data,
      });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  },
  async getById(req, res) {
    try {
      console.log(req.params.id);
      const user = await userService.findById(req.params.id);
      console.log(user);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const user_data = JSON.parse(JSON.stringify(user));
      delete user_data.encryptedPassword;
      res.status(200).json({ status: "OK", message: "OK", data: user_data });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  },
  async edit(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];

      const tokenPayload = jwt.verify(token, config.app.jwt_secret_key);
      const user = JSON.parse(JSON.stringify(await userService.findByEmail(tokenPayload.email)));
      delete user.password;

      if (req.file === undefined || req.file === null) {
        user.type_id = 1;
        user.name = req.body.name;
        user.city = req.body.city;
        user.address = req.body.address;
        user.contact = req.body.contact;
        user.updatedAt = new Date();
      } else {
        // Hapus foto lama
        if (user.photo !== null) {
          const oldImage = user.photo.substring(65, 85);
          await cloudinaryDestroy(oldImage);
        }

        // Upload foto baru
        const fileBase64 = req.file.buffer.toString("base64");
        const file = `data:${req.file.mimetype};base64,${fileBase64}`;
        const result = await cloudinaryUpload(file);
        const url = result.secure_url;

        // Masukan ke object Args
        user.type_id = 1;
        user.name = req.body.name;
        user.city = req.body.city;
        user.address = req.body.address;
        user.contact = req.body.contact;
        user.photo = url;
        user.updatedAt = new Date();
      }

      await userService.update(user.id, user);
      delete user.password;

      res.status(200).json({
        status: "OK",
        message: "User Updated",
        data: JSON.parse(JSON.stringify(user)),
      });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  },
};
