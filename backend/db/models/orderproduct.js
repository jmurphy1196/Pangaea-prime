"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderProduct.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });

      // Define association with Product
      // OrderProduct.belongsTo(models.Product, {
      //   foreignKey: "product_id",
      //   as: "product",
      //   onDelete: "CASCADE",
      // });
    }
  }
  OrderProduct.init(
    {
      order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      // product_id: {
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "Products",
      //     key: "id",
      //     onDelete: "CASCADE",
      //   },
      // },
      product_name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: [1, 255],
        },
      },
      price: {
        type: DataTypes.DECIMAL,
        validate: {
          isDecimal: true,
          min: 0,
          max: 99999,
        },
      },
      product_id: DataTypes.INTEGER,
      seller_id: DataTypes.INTEGER,
      main_image: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "OrderProduct",
    }
  );
  return OrderProduct;
};
