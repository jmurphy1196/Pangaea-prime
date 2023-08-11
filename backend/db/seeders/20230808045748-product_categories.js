"use strict";

const { ProductCategory } = require("../models"); // Adjust the path to your models directory if it's different

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    // Using the ProductCategory model to bulk create sample data with options
    await ProductCategory.bulkCreate(
      [
        {
          product_id: 1,
          category_id: 1,
        },
        {
          product_id: 1,
          category_id: 2,
        },
        {
          product_id: 2,
          category_id: 1,
        },
        {
          product_id: 3,
          category_id: 1,
        },
        {
          product_id: 4,
          category_id: 1,
        },
        {
          product_id: 5,
          category_id: 1,
        },
      ],
      options
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await ProductCategory.destroy({
      where: {
        product_id: { [Op.in]: [1, 2, 3, 4, 5, 6] },
        category_id: { [Op.in]: [1, 2, 3, 4, 5, 6] },
      },
      ...options,
    });
  },
};
