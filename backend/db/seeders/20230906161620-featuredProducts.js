"use strict";

const { FeaturedProduct } = require("../models"); // You need to provide the correct path to your User model
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // try {
    //   return FeaturedProduct.bulkCreate(
    //     [
    //       { productId: 1 },
    //       { productId: 2 },
    //       { productId: 3 },
    //       { productId: 4 },
    //       { productId: 5 },
    //     ],
    //     options
    //   );
    // } catch (e) {
    //   console.log("ERROR!!!");
    //   console.log(e);
    // }
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete(
    //   "FeaturedProducts",
    //   {
    //     productId: {
    //       [Sequelize.Op.between]: [1, 5],
    //     },
    //   },
    //   options
    // );
  },
};
