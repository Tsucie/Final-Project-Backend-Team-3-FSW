const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");

function createToken(user) {
  return jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: 100 * 60,
  });
}

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const user = await userService.findByEmail(email);
      if (!user) {
        res.status(404).json({ message: "Email not found" });
        return;
      }

      const check = await bcrypt.compare(password, user.encryptedPassword);

      if (!check) {
        res.status(401).json({
          message: "Password not match",
        });
        return;
      }

      // create token
      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type_id,
        googleId: null,
        registeredVia: "local api",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      delete user.password;

      res.status(201).json({
        token,
      });
    } catch (err) {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
        poses: process.env.JWT_SECRET_KEY,
      });
    }
  },

  async whoAmI(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, process.env.JWT_SIGNATURE_KEY);

      req.user = await userService.findByEmail(tokenPayload.email);

      if (!req.user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      const result = req.user;

      res.status(200).json({
        name: result.name,
        email: result.email,
        type: result.type_id,
        googleId: result.googleId,
        registeredVia: result.registeredVia,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      });
    } catch (err) {
      if (err.message.includes("jwt expired")) {
        res.status(401).json({ message: "Token Expired" });
        return;
      }
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    }
  },

  async google(req, res) {
    const { access_token } = req.body;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { sub, email, name } = response.data;

      let user = await userService.findByEmail(email);
      if (!user)
        user = await userService.create({
          email,
          name,
          type_id: 3,
          googleId: sub,
          registeredVia: "google",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

      const user_data = JSON.parse(JSON.stringify(user));
      delete user_data.encryptedPassword;

      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type_id,
        googleId: user.googleId,
        registeredVia: "google",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });

      res.status(201).json({ token, user: user_data });
    } catch (err) {
      console.log(err.message);
      res.status(401).json({ error: { name: err.name, message: err.message } });
    }
  },
};
