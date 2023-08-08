const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation");
const { UnauthorizedError } = require("../errors");

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid username or email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password"),
  handleValidationErrors,
];

const requireUser = async (req, res, next) => {
  if (!req.user)
    return next(new UnauthorizedError("You must be logged in to do this"));
  next();
};

module.exports = {
  validateLogin,
  requireUser,
};
