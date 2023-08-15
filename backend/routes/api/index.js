const router = require("express").Router();
const { restoreUser } = require("../../util/auth");

const sessionRouter = require("./session");
const userRouter = require("./users");
const productsRouter = require("./products");
const brandsRouter = require("./brands");
const categoriesRouter = require("./categories");
const reviewsRouter = require("./reviews");

router.use(restoreUser);
router.use("/session", sessionRouter);
router.use("/users", userRouter);
router.use("/products", productsRouter);
router.use("/brands", brandsRouter);
router.use("/categories", categoriesRouter);
router.use("/reviews", reviewsRouter);

router.post("/test", (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
