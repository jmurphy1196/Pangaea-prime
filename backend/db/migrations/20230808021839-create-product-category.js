"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "ProductCategories";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "ProductCategories",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        product_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Products",
            key: "id",
          },
          allowNull: false,
          onDelete: "CASCADE",
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Categories",
            key: "id",
          },
          allowNull: false,
          onDelete: "CASCADE",
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
    if (process.env.NODE_ENV === "production") {
      await queryInterface.addConstraint(options, {
        fields: ["product_id", "category_id"],
        type: "unique",
        name: "unique_product_category_constraint",
      });
    } else {
      await queryInterface.addConstraint("ProductCategories", {
        fields: ["product_id", "category_id"],
        type: "unique",
        name: "unique_product_category_constraint",
      });
    }
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductCategories");
  },
};
