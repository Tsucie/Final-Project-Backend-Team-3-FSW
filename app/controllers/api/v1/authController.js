const userService = require("../../../services/userService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const axios = require("axios");
const config = require("../../../../config/appconfig");

function createToken(user) {
  return jwt.sign(user, config.app.jwt_secret_key, {
    expiresIn: config.app.jwt_expiration_time,
  });
}

module.exports = {
  async login(req, res) {
    try {
      const email = req.body.email.toLowerCase();
      const password = req.body.password;

      const user = await userService.findByEmail(email);
      if (!user) {
        return res.status(404).json({ status: "NOT FOUND", message: "Email not found" });
      }

      const check = await bcrypt.compare(password, user.encryptedPassword);

      if (!check) {
        return res.status(401).json({
          status: "UNAUTHORIZED",
          message: "Password not match",
        });
      }

      // create token
      const token = createToken({
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.type_id,
      });

      delete user.password;

      return res.status(200).json({
        status: "OK",
        message: "Login Berhasil",
        token,
      });
    } catch (err) {
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
        // poses: config.app.jwt_secret_key,
      });
    }
  },

  async whoAmI(req, res) {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];
      const tokenPayload = jwt.verify(token, config.app.jwt_secret_key);

      req.user = await userService.findByEmail(tokenPayload.email);

      if (!req.user) {
        return res.status(404).json({
          status: "NOT FOUND",
          message: "Pengguna tidak ditemukan"
        });
      }
      const result = req.user;

      res.status(200).json({
        status: "OK",
        message: "Data berhasil ditemukan",
        data: result
      });
    } catch (err) {
      if (err.message.includes("jwt expired")) {
        return res.status(401).json({
          status: "UNAUTHORIZED",
          message: "Token Expired"
        });
      }
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message,
      });
    }
  },

  async google(req, res) {
    const { access_token } = req.body;
    try {
      if (!access_token) {
        return res.status(400).json({ status: "BAD REQUEST", message: "Data tidak lengkap" });
      }
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      );
      const { sub, email, name } = response.data;

      let user = await userService.findByEmail(email);
      if (!user)
        user = await userService.create({
          email,
          name,
          type_id: 2,
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
      return res.status(201).json({
        status: "CREATED",
        message: "Registrasi OAuth Berhasil", 
        token, 
        data: user_data 
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({
        status: "INTERNAL SERVER ERROR",
        message: err.message
      });
    }
  },
};
