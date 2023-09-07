"use strict";
const { Model } = require("sequelize");
const { Op, Sequelize } = require("sequelize");
const SCHEMA =
  process.env.NODE_ENV === "production" ? `${process.env.SCHEMA}.` : "";

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Category, {
        through: "ProductCategories",
        foreignKey: "product_id",
        onDelete: "CASCADE",
      });
      Product.hasMany(models.Rating, {
        foreignKey: "product_id",
        as: "ratings",
        onDelete: "CASCADE",
      });
      Product.belongsTo(models.Brand, { foreignKey: "brand_id" });
      Product.belongsToMany(models.Cart, {
        through: models.CartProduct,
        foreignKey: "product_id",
        as: "carts",
        onDelete: "CASCADE",
      });
      Product.hasMany(models.FeaturedProduct, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: true,
        },
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: true,
          min: 0,
          max: 99999,
        },
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 1,
        },
      },
      brand_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Brands",
          key: "id",
        },
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: true,
          min: 0,
          max: 999999,
        },
        allowNull: false,
      },
      main_image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: true,
          notEmpty: true,
        },
        allowNull: false,
        defaultValue:
          "https://pangaea-prime.s3.us-west-1.amazonaws.com/placeholder.jpg",
      },
      additional_images: {
        type: DataTypes.JSON,
        validate: {},
      },
    },
    {
      sequelize,
      modelName: "Product",
      defaultScope: {
        include: [
          {
            model: sequelize.models.Category,
            through: {
              attributes: [],
            },
          },
          {
            model: sequelize.models.Brand,
          },
        ],
      },
      scopes: {
        ratings: {
          include: [
            {
              model: sequelize.models.Category,
              as: "Categories",
              through: {
                attributes: [],
              },
            },
            {
              model: sequelize.models.Brand,
            },
          ],
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
              [
                Sequelize.literal(`(
            SELECT COUNT(*)
            FROM ${SCHEMA}"Ratings"
            WHERE ${SCHEMA}"Ratings"."product_id" = "Product"."id"
          )`),
                "numRatings",
              ],
            ],
          },
        },
      },
    }
  );
  return Product;
};
