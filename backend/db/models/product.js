"use strict";
const { Model } = require("sequelize");
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
      });
      Product.hasMany(models.Rating, {
        foreignKey: "product_id",
        as: "ratings",
      });
    }
  }
  Product.init(
    {
      product_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [1, 255], // Assuming a max length of 255 for product name
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
      },
      additional_images: {
        type: DataTypes.JSON,
        validate: {},
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
