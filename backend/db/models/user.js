"use strict";
const { Model, Validator } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Rating, { foreignKey: "user_id", as: "ratings" });
      User.hasMany(models.Product, {
        foreignKey: "seller_id",
        as: "products",
      });
      User.hasOne(models.Cart, { foreignKey: "user_id", as: "cart" });
      User.hasMany(models.Order, { foreignKey: "user_id", as: "orders" });
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true,
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2],
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["email", "hashedPassword", "createdAt", "updatedAt"],
        },
      },
      tableName: "Users",
      hooks: {
        afterCreate: async (user, options) => {
          const cart = await user.createCart();
          return cart;
        },
      },
    }
  );
  return User;
};
