const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");
const Resizer = require("../../../../utilities/Resizer");

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
        type_id: req.body.type_id,
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
      if (!req.params.id || !req.body.name || !req.body.contact) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap"});
      }
      let user = await userService.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ status: "NOT FOUND", message: "Data user tidak ditemukan"});
      }
      let updatedObj = new Object();
      updatedObj.name = req.body.name;
      updatedObj.contact = req.body.contact;
      if (req.body.city) updatedObj.city = req.body.city;
      if (req.body.address) updatedObj.address = req.body.address;
      if (req.file) {
        const imgPath = path.join(__dirname, "/../../../../public/images/user");
        const fileUpload = new Resizer(imgPath, `${updatedObj.name}_`);
        const filename = await fileUpload.save(req.file.buffer);
        updatedObj.photo = filename;
        if (user.photo) {
          fs.unlinkSync(path.join(imgPath, user.photo));
        }
      }
      const newUser = await userService.update(req.params.id, updatedObj);
      const userData = JSON.parse(JSON.stringify(newUser));
      delete userData.encryptedPassword;
      res.status(201).json({
        status: "CREATED",
        message: "Data akun berhasil diubah",
        data: userData[1] 
      });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  }
};
