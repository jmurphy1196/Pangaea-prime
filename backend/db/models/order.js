"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
      Order.hasMany(models.OrderProduct, {
        foreignKey: "order_id",
        as: "products",
      });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      total_price: DataTypes.DECIMAL,
      status: {
        type: DataTypes.ENUM,
        values: ["pending", "shipped", "delivered", "cancelled"],
      },
      order_date: DataTypes.DATE,
      address_1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
