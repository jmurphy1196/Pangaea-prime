"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "FeaturedProducts";

    try {
      await queryInterface.bulkInsert(
        "FeaturedProducts",
        [
          { productId: 1 },
          { productId: 2 },
          { productId: 3 },
          { productId: 4 },
          { productId: 5 },
        ],
        options
      );
    } catch (e) {
      console.log(e);
    }
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "FeaturedProducts";

    await queryInterface.bulkDelete(
      "FeaturedProducts",
      {
        productId: {
          [Sequelize.Op.between]: [1, 5],
        },
      },
      options
    );
  },
};
