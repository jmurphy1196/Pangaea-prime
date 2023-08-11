const router = require("express").Router();
const { Product, Brand, Category, Rating } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");
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
const { checkProductUpdateFields } = require("../../middleware/product");
router.get("/", async (req, res, next) => {
  try {
    //sqlite does not support iLike
    const likeOperator =
      process.env.NODE_ENV === "production" ? Op.iLike : Op.like;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (+req.query.page - 1) * limit || 0;
    const product_name = req.query.name || "";
    let categories = req.query.categories;

    if (typeof categories === "string") categories = categories.split(",");

    let whereClause = {
      product_name: {
        [likeOperator]: `%${product_name}%`,
      },
    };
    const includeClause = [
      {
        model: Category,
        as: "Categories",
        through: {
          attributes: [],
        },
      },
      {
        model: Brand,
      },
    ];
    if (categories && categories.length) {
      includeClause[0].where = {
        name: {
          [Op.in]: categories,
        },
      };
    }
    const SCHEMA =
      process.env.NODE_ENV === "production" ? `${process.env.SCHEMA}.` : "";

    const products = await Product.unscoped().findAll({
      where: whereClause,
      include: includeClause,
      limit,
      offset,
      attributes: {
        include: [
          [
            Sequelize.literal(`(
          SELECT AVG(rating)
          FROM ${SCHEMA}"Ratings"
          WHERE ${SCHEMA}"Ratings"."product_id" = "Product"."id"
        )`),
            "avgRating",
          ],
        ],
      },
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
  checkProductExists,
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
  checkProductUpdateFields,
  async (req, res, next) => {
    const {
      product_name,
      price,
      description,
      stock_quantity,
      brand,
      categories,
    } = req.body;

    [product_name, price, description, stock_quantity].forEach((field) => {
      if (field) {
        req.product[field] = field;
      }
    });
    if (brand) {
      let brand_obj = await Brand.findOne({ where: { name: brand } });
      if (!brand_obj) {
        brand_obj = await Brand.create({ name: brand });
        req.product.brand_id = brand_obj.id;
      }
    }
    // TODO possible bug, updated category may not show up in first response
    if (categories) {
      for (let categoryName of categories) {
        let category = await Category.findOne({
          where: { name: categoryName },
        });

        if (!category) {
          category = await Category.create({ name: categoryName });
        }

        await req.product.addCategory(category);
      }
    }
    await req.product.save();
    return res.status(200).json(req.product);
  }
);

module.exports = router;
