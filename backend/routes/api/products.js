const router = require("express").Router();
const {
  Product,
  Brand,
  Category,
  Rating,
  ProductCategory,
  User,
  FeaturedProduct,
} = require("../../db/models");
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
  checkReviewFields,
} = require("../../middleware");
const multer = require("multer");
const { checkProductUpdateFields } = require("../../middleware/product");
const { deleteS3Obj } = require("../../util/s3");
router.get("/", async (req, res, next) => {
  try {
    //sqlite does not support iLike
    const likeOperator =
      process.env.NODE_ENV === "production" ? Op.iLike : Op.like;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (+req.query.page - 1) * limit || 0;
    const product_name = req.query.name || "";
    const brand_name = req.query.brand || "";
    const usrId = req.query.usrId;
    if (usrId) {
      const userProducts = await Product.unscoped().findAll({
        where: {
          seller_id: usrId,
        },
        include: [
          {
            model: Category,
            as: "Categories",
          },
          {
            model: Brand,
          },
        ],
      });
      return res.status(200).json(userProducts);
    }
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
        where: brand_name
          ? { name: { [likeOperator]: `%${brand_name}%` } }
          : undefined,
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
router.put("/featured", requireUser, async (req, res, next) => {
  const { productIds } = req.body;
  if (productIds.length !== 5)
    return next(
      new BadReqestError("Must have 5 featured products", {
        productIds: "Must have 5 featured products",
      })
    );
  const currentFeatured = await FeaturedProduct.findAll();
  for (let prod of currentFeatured) {
    await prod.destroy();
  }
  for (let prodId of productIds) {
    await FeaturedProduct.create({
      productId: prodId,
    });
  }
  return res.status(201).json("Featured products updated");
});
router.get("/featured", async (req, res, next) => {
  const featuredProducts = await FeaturedProduct.findAll({
    include: [
      {
        model: Product,
        include: [
          {
            model: Brand,
          },
          {
            model: Category,
          },
        ],
      },
    ],
  });
  return res.status(200).json(featuredProducts);
});
router.get("/:productId", checkProductExists, async (req, res, next) => {
  const fullProduct = await Product.scope("ratings").findByPk(
    req.params.productId
  );

  return res.status(200).json(fullProduct);
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
      name: "additional_images[]",
      maxCount: 4,
    },
  ]),
  async (req, res, next) => {
    const main_image =
      req.files &&
      Array.isArray(req.files.main_image) &&
      req.files.main_image.length > 0
        ? req.files.main_image[0].location
        : undefined;
    const additional_images = req.files["additional_images[]"];
    const additional_images_json =
      typeof req.product.additional_images === "string"
        ? JSON.parse(req.product.additional_images)
        : req.product.additional_images;
    if (additional_images && additional_images.length) {
      for (let additional_image of additional_images) {
        additional_images_json.urls.push(additional_image.location);
      }
    }
    console.log("main_image location", main_image);
    console.log(
      "additional_images_location",
      JSON.stringify(additional_images_json)
    );
    if (main_image) {
      req.product.main_image = main_image;
    }
    if (additional_images && additional_images.length) {
      req.product.additional_images = JSON.stringify(additional_images_json);
    }
    await req.product.save();

    return res.status(201).json("Upload successful");
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
    let brand_object = await Brand.findOne({
      where: {
        name: brand,
      },
    });
    //there is no existing brand
    if (!brand_object) {
      brand_object = await Brand.create({
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
      main_image_to_delete,
      additional_images_to_delete,
    } = req.body;
    console.log("THIS IS RUNNING");
    console.log("ADDITIONAL TO DELETE ", additional_images_to_delete);
    console.log(product_name);
    let { categories } = req.body;

    const updates = { product_name, price, description, stock_quantity };
    for (let key in updates) {
      if (updates[key]) {
        req.product[key] = updates[key];
      }
    }
    if (brand) {
      let brand_obj = await Brand.findOne({ where: { name: brand } });
      if (!brand_obj) {
        brand_obj = await Brand.create({ name: brand });
      }
      req.product.brand_id = brand_obj.id;
    }
    // delete from s3 any unwanted images leftover
    if (main_image_to_delete) {
      const key = main_image_to_delete.split("/").slice(3).join("/");
      if (key !== "placeholder.jpg") {
        deleteS3Obj(key);
      }
      req.product.main_image =
        "https://pangaea-prime.s3.us-west-1.amazonaws.com/placeholder.jpg";
      await req.product.save();
    }
    // messy
    if (additional_images_to_delete && additional_images_to_delete.length > 0) {
      for (let img of additional_images_to_delete) {
        let prodImgs = req.product.additional_images;
        if (typeof prodImgs === "string") {
          console.log(prodImgs, "IS A STRING!");
          console.log(prodImgs, "IS A STRING!");
          console.log(prodImgs, "IS A STRING!");
          const parsedProdImgs = JSON.parse(prodImgs);
          parsedProdImgs.urls = parsedProdImgs.urls.filter(
            (url) => url !== img
          );
          console.log("PARSEDPRODIMGS", parsedProdImgs);
          req.product.additional_images = JSON.stringify(parsedProdImgs);
          await req.product.save();
        } else {
          const newProdImgs = structuredClone(prodImgs);
          newProdImgs.urls = prodImgs.urls.filter((url) => url !== img);
          req.product.additional_images = newProdImgs;
          await req.product.save();
        }
        const key = img.split("/").slice(3).join("/");
        deleteS3Obj(key);
      }
    }
    // TODO possible bug, updated category may not show up in first response
    if (categories) {
      await req.product.setCategories([]);
      categories = categories.map((cat) => cat.trim());
      for (let categoryName of categories) {
        let category = await Category.findOne({
          where: { name: categoryName },
        });

        if (!category) {
          category = await Category.create({ name: categoryName });
        }

        const existingRelation = await ProductCategory.findOne({
          where: {
            product_id: req.product.id,
            category_id: category.id,
          },
        });
        console.log("EXISTING RELATION", existingRelation);

        if (!existingRelation) {
          console.log("SDKLFJ THIS LINE IS RUNNING");
          await req.product.addCategory(category);
        }
      }
    }
    await req.product.save();
    return res.status(200).json(req.product);
  }
);

router.delete(
  "/:productId",
  checkProductExists,
  checkUserCanEditProduct,
  async (req, res, next) => {
    console.log("DELETETING ");
    await req.product.destroy();
    return res.status(200).json("product deleted");
  }
);

// get all product reviews
router.get(
  "/:productId/reviews",
  checkProductExists,
  async (req, res, next) => {
    let userReview;
    if (req.user) {
      userReview = await req.product.getRatings({
        where: {
          user_id: req.user.id,
          product_id: req.product.id,
        },
      });
    }
    const productReviews = await req.product.getRatings({
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    res.status(200).json({
      reviews: productReviews,
      userReview: userReview ? userReview[0] : null,
    });
  }
);

router.post(
  "/:productId/reviews",
  requireUser,
  checkProductExists,
  checkReviewFields,
  async (req, res, next) => {
    const existingReview = await Rating.findOne({
      where: {
        user_id: req.user.id,
        product_id: req.product.id,
      },
    });
    if (existingReview)
      return next(
        new BadReqestError("A review already exists for you", {
          review: "Review already exists",
        })
      );
    const { review, rating } = req.body;
    const newRating = await req.user.createRating({
      rating,
      review,
      product_id: req.product.id,
    });
    const newRatingWithUser = await Rating.findByPk(newRating.id, {
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    });
    return res.status(201).json(newRatingWithUser);
  }
);

module.exports = router;
