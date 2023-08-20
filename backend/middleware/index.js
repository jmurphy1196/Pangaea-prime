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
const { checkCreateOrderFields } = require("./order");

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
  checkCreateOrderFields,
};
