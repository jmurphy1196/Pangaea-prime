"use strict";

const { Category } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await Category.bulkCreate(
      [
        {
          name: "Electronics",
          description: "Devices, gadgets, and more.",
        },
        {
          name: "Books",
          description: "Fiction, non-fiction, and academic books.",
        },
        {
          name: "Clothing",
          description: "Men's, women's, and children's clothing.",
        },
        {
          name: "Home",
          description: "Furniture, decor, gardening tools, and more.",
        },
        {
          name: "Sports",
          description: "Sporting goods, outdoor equipment, and more.",
        },
        {
          name: "Games",
          description: "Toys, board games, and more for kids and adults.",
        },
        {
          name: "Beauty",
          description: "Cosmetics, skincare, health supplements, and more.",
        },
        {
          name: "Automotive",
          description: "Car parts, accessories, tools, and more.",
        },
        {
          name: "Music",
          description: "Instruments, music albums, movies, and more.",
        },
        {
          name: "Grocery",
          description: "Food items, cleaning supplies, and more.",
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

    await Category.destroy({
      where: {
        name: { [Op.in]: ["Electronics", "Books", "Clothing"] },
      },
    });
  },
};
