"use strict";

const { Rating } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // let options = {};
    // if (process.env.NODE_ENV === "production") {
    //   options.schema = process.env.SCHEMA;
    // }
    // await Rating.bulkCreate(
    //   [
    //     {
    //       product_id: 1,
    //       user_id: 1,
    //       rating: 5,
    //       review: "Great product!",
    //     },
    //     {
    //       product_id: 2,
    //       user_id: 1,
    //       rating: 4,
    //       review: "Good product, but could be improved.",
    //     },
    //     {
    //       product_id: 3,
    //       user_id: 1,
    //       rating: 4,
    //       review: "Decent product. Worth the price.",
    //     },
    //     {
    //       product_id: 4,
    //       user_id: 1,
    //       rating: 3,
    //       review: "Average product. Nothing special.",
    //     },
    //     {
    //       product_id: 1,
    //       user_id: 2,
    //       rating: 4,
    //       review: "I liked it. Would recommend.",
    //     },
    //     {
    //       product_id: 2,
    //       user_id: 2,
    //       rating: 5,
    //       review: "Fantastic! Exceeded my expectations.",
    //     },
    //     {
    //       product_id: 3,
    //       user_id: 2,
    //       rating: 3,
    //       review: "It's okay, not the best.",
    //     },
    //     {
    //       product_id: 4,
    //       user_id: 2,
    //       rating: 2,
    //       review: "Not satisfied. Expected better.",
    //     },
    //     {
    //       product_id: 1,
    //       user_id: 3,
    //       rating: 5,
    //       review: "Perfect! Just what I needed.",
    //     },
    //     {
    //       product_id: 2,
    //       user_id: 3,
    //       rating: 4,
    //       review: "Good enough for the price.",
    //     },
    //     {
    //       product_id: 3,
    //       user_id: 3,
    //       rating: 3,
    //       review: "Could be better. It's just okay.",
    //     },
    //     {
    //       product_id: 4,
    //       user_id: 3,
    //       rating: 2,
    //       review: "Disappointed. Not worth the money.",
    //     },
    //   ],
    //   options
    // );
  },

  down: async (queryInterface, Sequelize) => {
    // const Op = Sequelize.Op;
    // let options = {};
    // if (process.env.NODE_ENV === "production") {
    //   options.schema = process.env.SCHEMA;
    // }
    // await Rating.destroy({
    //   where: {
    //     product_id: { [Op.in]: [1, 2, 3, 4] },
    //     user_id: { [Op.in]: [1, 2, 3] },
    //   },
    //   ...options,
    // });
  },
};
