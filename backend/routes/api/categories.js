const router = require("express").Router();
const { Category } = require("../../db/models");

router.get("/", async (req, res, next) => {
  const categories = await Category.findAll({
    limit: 10,
  });
  return res.status(200).json(categories);
});

module.exports = router;
