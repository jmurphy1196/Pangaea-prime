const { validateLogin } = require("./auth");
const { uploadProductImage } = require("./multer");
const {
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
} = require("./product");
const { checkBrandExists } = require("./brand");
const {
  checkReviewExists,
  checkReviewFields,
  checkUserCanEditReview,
} = require("./review");
const { checkCartProductFields } = require("./cart");

module.exports = {
  validateLogin,
  uploadProductImage,
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
  checkBrandExists,
  checkReviewExists,
  checkReviewFields,
  checkUserCanEditReview,
  checkCartProductFields,
};
