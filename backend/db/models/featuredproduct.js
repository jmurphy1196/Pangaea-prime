"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FeaturedProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FeaturedProduct.belongsTo(models.Product, {
        foreignKey: "productId",
        onDelete: "CASCADE",
      });
    }
  }
  FeaturedProduct.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Products",
          key: "id",
          onDelete: "CASCADE",
        },
      },
    },
    {
      sequelize,
      modelName: "FeaturedProduct",
    }
  );
  return FeaturedProduct;
};
