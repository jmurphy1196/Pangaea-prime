"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rating.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Rating.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }
  Rating.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      review: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Rating",
    }
  );
  return Rating;
};
