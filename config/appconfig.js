require('dotenv').config();

module.exports = {
  jwt_secret_key: process.env.JWT_SECRET_KEY ?? 'BinarCommerce',
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME ?? '12h',
}