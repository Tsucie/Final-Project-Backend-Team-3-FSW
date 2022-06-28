/* eslint-disable no-unused-vars */
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

module.exports = multer({ storage });
