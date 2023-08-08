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
