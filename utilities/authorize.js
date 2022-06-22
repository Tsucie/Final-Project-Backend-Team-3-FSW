const config = require('../config/appconfig');
const userTypes = require('../utilities/userenum');
const jwt = require('jsonwebtoken');

function verifyToken(req, res) {
  const header = req.header("Authorization");
  if (!header) throw res.sendStatus(401); // Unauthorized
  const token = header.split(" ")[1];
  if (!token) return res.sendStatus(403); // Forbidden
  return jwt.verify(token, config.jwt_secret_key);
}

module.exports = {
  all(req, res, next) {
    verifyToken(req, res);
    next();
  },
  seller(req, res, next) {
    const payload = verifyToken(req, res);
    if (payload.type !== userTypes.Seller) {
      return res.sendStatus(403);
    }
    else next();
  },
  buyer(req, res, next) {
    if (payload.type !== userTypes.Buyer) {
      return res.sendStatus(403);
    }
    else next();
  }
}