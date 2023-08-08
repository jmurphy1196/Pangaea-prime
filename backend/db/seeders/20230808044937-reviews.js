"use strict";

const { Rating } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await Rating.bulkCreate(
      [
        {
          product_id: 1,
          user_id: 1,
          rating: 5,
          review: "Great product!",
        },
        {
          product_id: 2,
          user_id: 1,
          rating: 4,
          review: "Good product, but could be improved.",
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

    await Rating.destroy({
      where: {
        product_id: { [Op.in]: [1, 2] },
        user_id: 1,
      },
      ...options,
    });
  },
};
