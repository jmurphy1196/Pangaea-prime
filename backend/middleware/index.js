const { validateLogin } = require("./auth");
const { uploadProductImage } = require("./multer");
const {
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
} = require("./product");
const { checkBrandExists } = require("./brand");

module.exports = {
  validateLogin,
  uploadProductImage,
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
  checkBrandExists,
};
