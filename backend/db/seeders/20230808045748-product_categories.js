"use strict";

const { ProductCategory } = require("../models"); // Adjust the path to your models directory if it's different

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // let options = {};
    // if (process.env.NODE_ENV === "production") {
    //   options.schema = process.env.SCHEMA;
    // }
    // const productCategoryAssociations = [];
    // for (let productId = 1; productId <= 56; productId++) {
    //   const numCategories = Math.floor(Math.random() * 3) + 1;
    //   const usedCategories = new Set();
    //   for (let j = 0; j < numCategories; j++) {
    //     let categoryId;
    //     do {
    //       categoryId = Math.floor(Math.random() * 10) + 1;
    //     } while (usedCategories.has(categoryId));
    //     usedCategories.add(categoryId);
    //     productCategoryAssociations.push({
    //       product_id: productId,
    //       category_id: categoryId,
    //     });
    //   }
    // }
    // // Using the ProductCategory model to bulk create sample data with options
    // await ProductCategory.bulkCreate(productCategoryAssociations, options);
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    // let options = {};
    // if (process.env.NODE_ENV === "production") {
    //   options.schema = process.env.SCHEMA;
    // }
    // // Delete all associations for products 1 through 56
    // await ProductCategory.destroy({
    //   where: {
    //     product_id: { [Op.between]: [1, 56] },
    //   },
    //   ...options,
    // });
  },
};
