const {
  checkReviewExists,
  checkUserCanEditReview,
  checkReviewFields,
} = require("../../middleware");

const { Rating, User } = require("../../db/models");

const router = require("express").Router();

router.put(
  "/:reviewId",
  checkReviewExists,
  checkUserCanEditReview,
  checkReviewFields,
  async (req, res, next) => {
    const { review, rating } = req.body;
    req.review.review = review;
    req.review.rating = rating;
    await req.review.save();
    const reviewWithUser = await Rating.findByPk(req.review.id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    return res.status(200).json(reviewWithUser);
  }
);

router.delete(
  "/:reviewId",
  checkReviewExists,
  checkUserCanEditReview,
  async (req, res, next) => {
    await req.review.destroy();
    res.status(200).json("Successfully deleted");
  }
);

module.exports = router;
