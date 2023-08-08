const { validateLogin } = require("./auth");
const { uploadProductImage } = require("./multer");
const {
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
} = require("./product");

module.exports = {
  validateLogin,
  uploadProductImage,
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
};
