/** Destruct environment variable to get database configuration */
require("dotenv").config();

const {
  DB_USERNAME = "qhtzncirffqehf",
  DB_PASSWORD = "8f99be3bb89dbce5d4038d9a1d1dc1b18abee22424ccac5e23493fb44d0895a9",
  DB_HOST = "ec2-52-22-136-117.compute-1.amazonaws.com",
  DB_NAME = "d7jnpue5rrkrlm",
} = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_dev`,
    host: DB_HOST,
    dialect: "postgres",
    ssl: true,
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}_test`,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: `${DB_NAME}`,
    host: DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
