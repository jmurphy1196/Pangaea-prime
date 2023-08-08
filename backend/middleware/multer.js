const multer = require("multer");
const { s3ProductStorage, sanitizeFile } = require("../util/s3");

const uploadProductImage = multer({
  storage: s3ProductStorage,
  fileFilter: (req, file, cb) => {
    sanitizeFile(file, cb);
  },
  //   2MB
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

module.exports = { uploadProductImage };
