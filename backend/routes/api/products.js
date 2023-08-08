const router = require("express").Router();
const { Product, Brand, Category } = require("../../db/models");
const { Op } = require("sequelize");
const {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
  BadReqestError,
} = require("../../errors");
const { requireUser } = require("../../middleware/auth");
const {
  uploadProductImage,
  checkProductFields,
  checkProductExists,
  checkUserCanEditProduct,
} = require("../../middleware");
const multer = require("multer");
router.get("/", async (req, res, next) => {
  try {
    //sqlite does not support iLike
    const likeOperator =
      process.env.NODE_ENV === "production" ? Op.iLike : Op.like;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (+req.query.page - 1) * limit || 0;
    const product_name = req.query.name || "";
    const products = await Product.findAll({
      where: {
        product_name: {
          [likeOperator]: `%${product_name}%`,
        },
      },
      limit,
      offset,
    });
    if (!products.length)
      return next(new NotFoundError(`Products ${product_name} not found`));
    res.status(200).json(products);
  } catch (err) {
    console.error("There was an error fetching products", err);
    return next(err);
  }
});
router.get("/:productId", checkProductExists, async (req, res, next) => {
  return res.status(200).json(req.product);
});

router.post(
  "/:productId/images",
  uploadProductImage.fields([
    {
      name: "main_image",
      maxCount: 1,
    },
    {
      name: "additional_images",
      maxCount: 12,
    },
  ]),
  async (req, res, next) => {
    const main_image = req.files.main_image[0].location;
    const additional_images = req.files.additional_images;
    const additional_images_json = {
      urls: [],
    };
    if (additional_images.length) {
      for (let additional_image of additional_images) {
        additional_images_json.urls.push(additional_image.location);
      }
    }
    console.log("main_image location", main_image);
    console.log(
      "additional_images_location",
      JSON.stringify(additional_images_json)
    );

    return res.status(201);
  }
);

router.post("/", requireUser, checkProductFields, async (req, res, next) => {
  try {
    const {
      product_name,
      description,
      price,
      brand,
      stock_quantity,
      categories,
    } = req.body;
    const errors = {};
    let brand_object = await Brand.findOne({
      name: brand,
    });
    //there is no existing brand
    if (!brand_object) {
      brand_object = Brand.create({
        name: brand,
      });
    }
    const product = await req.user.createProduct({
      product_name,
      description,
      price,
      brand_id: brand_object.id,
      stock_quantity,
    });

    for (let categoryName of categories) {
      let category = await Category.findOne({
        where: { name: categoryName },
      });

      // If category doesn't exist, create it
      if (!category) {
        category = await Category.create({ name: categoryName });
      }

      // Associate product with the category
      await product.addCategory(category);
    }

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    return next(error);
  }
});
router.put(
  "/:productId",
  checkProductExists,
  checkUserCanEditProduct,
  async (req, res, next) => {}
);

module.exports = router;
