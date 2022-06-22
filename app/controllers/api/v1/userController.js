const userService = require("../../../services/userService");
const bcrypt = require("bcrypt");

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
        user: user_data,
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
      res.status(200).json({ user: user_data });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  },
  async update(req, res) {
    try {
      const newUser = await userService.update(req.params.id, req.body);
      const userData = JSON.parse(JSON.stringify(newUser));
      delete userData.encryptedPassword;
      res.status(201).json({ user: userData });
    } catch (err) {
      res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  }
};
