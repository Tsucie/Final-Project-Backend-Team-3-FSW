/**
 * @file middleware uploadMiddleware.js
 * @author Rizky Adji Pangestu
 */

const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
});

module.exports = upload;
