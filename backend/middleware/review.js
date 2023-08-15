const {
  checkResourceExists,
  checkUserCanEditResource,
} = require("../util/checkResourceGenerator");
const { Rating } = require("../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../util/validation");
const { UnauthorizedError } = require("../errors");

const checkReviewExists = checkResourceExists("reviewId", Rating, "review");
const checkUserCanEditReview = checkUserCanEditResource(["review", "user_id"]);

const checkReviewFields = [
  check("rating")
    .exists()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be between 1 and 5"),
  check("review")
    .exists()
    .isLength({ min: 10, max: 200 })
    .withMessage("Review must be between 10 and 200 characters"),
  handleValidationErrors,
];

module.exports = {
  checkReviewExists,
  checkReviewFields,
  checkUserCanEditReview,
};
