const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation");
const { UnauthorizedError } = require("../errors");
const { uploadProductImage } = require("./multer");
const { BadReqestError } = require("../errors");
const {
  checkResourceExists,
  checkUserCanEditResource,
} = require("../util/checkResourceGenerator");
const { Product } = require("../db/models");

const checkProductExists = checkResourceExists("productId", Product, "product");
const checkUserCanEditProduct = checkUserCanEditResource([
  "product",
  "seller_id",
]);

const checkMainImage = (req, res, next) => {
  if (
    !req.files ||
    !req.files.main_image ||
    req.files.main_image.length === 0
  ) {
    return next(
      new BadReqestError("Main image is required", {
        main_image: "required",
      })
    );
  }
  next();
};

const checkProductFields = [
  check("product_name")
    .exists({ checkFalsy: true })
    .isLength({ min: 3, max: 200 })
    .withMessage("product name must be between 3 and 200 characters"),
  check("price")
    .exists()
    .isFloat({ min: 0, max: 999999 })
    .withMessage("price must be between 0 and 999999"),
  check("description")
    .exists()
    .isLength({ min: 10, max: 600 })
    .withMessage("description must be between 10 and 600 characters"),
  check("stock_quantity")
    .exists()
    .isInt({ min: 0, max: 999999 })
    .withMessage("stock quantity must be between 0 and 999999"),
  check("brand").exists().isLength({ min: 1, max: 30 }),
  check("categories").optional().isArray({ min: 1, max: 20 }),
  handleValidationErrors,
];

const checkProductUpdateFields = [
  check("product_name")
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage("product name must be between 3 and 200 characters"),
  check("price")
    .optional()
    .isFloat({ min: 0, max: 999999 })
    .withMessage("price must be between 0 and 999999"),
  check("description")
    .optional()
    .isLength({ min: 10, max: 600 })
    .withMessage("description must be between 10 and 600 characters"),
  check("stock_quantity")
    .optional()
    .isInt({ min: 0, max: 999999 })
    .withMessage("stock quantity must be between 0 and 999999"),
  check("brand").optional().isLength({ min: 1, max: 30 }),
  check("categories").optional().isArray({ min: 1, max: 20 }),
  handleValidationErrors,
];
module.exports = {
  checkProductFields,
  checkMainImage,
  checkProductExists,
  checkUserCanEditProduct,
  checkProductUpdateFields,
};
