const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation");

const checkCartProductFields = [
  check("productId")
    .notEmpty()
    .isInt({ min: 1 })
    .withMessage("Please provide a valid productId"),
  check("quantity")
    .notEmpty()
    .isInt({ min: 1, max: 999999 })
    .withMessage("Please provide a valid quantity"),
  handleValidationErrors,
];

module.exports = {
  checkCartProductFields,
};
