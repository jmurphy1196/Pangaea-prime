"use strict";

const { Brand } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    await Brand.bulkCreate(
      [
        {
          name: "Apple",
          description: "Tech company known for iPhones, Macs, and more.",
        },
        {
          name: "Nike",
          description: "Sportswear brand known for sneakers and athletic wear.",
        },
        {
          name: "Sony",
          description: "Electronics and entertainment company.",
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

    await Brand.destroy({
      where: {
        name: { [Op.in]: ["Apple", "Nike", "Sony"] },
      },
      ...options,
    });
  },
};
