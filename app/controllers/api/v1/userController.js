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
        type_id: 3,
        googleId: null,
        registeredVia: "local api",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const user_data = JSON.parse(JSON.stringify(newUser));

      delete user_data.encryptedPassword;

      res.status(201).json({
        user: user_data,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },
};
