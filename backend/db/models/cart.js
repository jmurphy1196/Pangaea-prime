"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Cart.belongsToMany(models.Product, {
        through: models.CartProduct,
        foreignKey: "cart_id",
        as: "products",
      });
    }
  }
  Cart.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
