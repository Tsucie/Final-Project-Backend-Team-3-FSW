// require('dotenv').config();

// module.exports = {
//   jwt_secret_key: process.env.JWT_SECRET_KEY ?? 'BinarCommerce',
//   jwt_expiration_time: process.env.JWT_EXPIRATION_TIME ?? '12h',
// }

/**
 * @file config appconfig.js
 * @author Rizky Adji Pangestu
 */

require("dotenv").config();

module.exports = {
  app: {
    port: process.env.DEV_APP_PORT || 8000,
    app_name: process.env.APP_NAME || "final-project",
    env: process.env.NODE_ENV || "development",
    server: process.env.SERVER || "localhost",
    jwt_secret_key: process.env.SECRET_KEY || "BinarCommerce",
    jwt_expiration_time: process.env.JWT_EXPIRE || "12h",
  }
};