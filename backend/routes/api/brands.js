const router = require("express").Router();
const { Brand } = require("../../db/models");
const { checkBrandExists } = require("../../middleware");

router.get("/", async (req, res, next) => {
  const brands = await Brand.findAll();
  return res.status(200).json(brands);
});

router.get("/:id/products", checkBrandExists, async (req, res, next) => {
  const products = await req.brand.getProducts();
  return res.status(200).json(products);
});

module.exports = router;
