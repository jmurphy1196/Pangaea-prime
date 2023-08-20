const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation");
const { US_STATES } = require("../constants");
const {
  checkResourceExists,
  checkUserCanEditResource,
} = require("../util/checkResourceGenerator");
const { Order } = require("../db/models");

const checkCreateOrderFields = [
  check("address_1")
    .exists()
    .notEmpty()
    .isLength({ min: 1, max: 200 })
    .withMessage(
      "Address line 1 must not be empty and between 1 and 200 characters"
    ),
  check("address_2")
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage(
      "Address line 2 is optional but must be between 1 and 200 characters if provided"
    ),
  check("city")
    .exists()
    .notEmpty()
    .isLength({ min: 1, max: 40 })
    .withMessage("City must not be empty and between 1 and 40 characters"),
  check("state")
    .exists()
    .notEmpty()
    .withMessage("State must not be empty")
    .custom((value) => US_STATES.includes(value))
    .withMessage("Invalid state provided"),
  check("postalCode")
    .exists()
    .notEmpty()
    .matches(/(^\d{5}$)|(^\d{5}-\d{4}$)/)
    .withMessage("Invalid US postal code format."),
  handleValidationErrors,
];

const checkOrderExists = checkResourceExists("orderId", Order, "order");
const checkUserCanEditOrder = checkUserCanEditResource(["order", "user_id"]);

module.exports = {
  checkCreateOrderFields,
  checkOrderExists,
  checkUserCanEditOrder,
};
