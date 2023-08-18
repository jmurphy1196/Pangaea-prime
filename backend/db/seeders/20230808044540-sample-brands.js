"use strict";

const { Brand } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    const brandNames = [
      "Apple",
      "Nike",
      "Sony",
      "Adidas",
      "Samsung",
      "LG",
      "Puma",
      "Microsoft",
      "Google",
      "Amazon",
      "Dell",
      "HP",
      "Asus",
      "Acer",
      "Lenovo",
      "Panasonic",
      "Canon",
      "Nikon",
      "Toshiba",
      "Philips",
      "Sharp",
      "Fujitsu",
    ];

    const genericDescriptions = [
      "A global leader in innovative products and services.",
      "Renowned for its high-quality range and customer satisfaction.",
      "Pioneers in the industry with a rich history of breakthroughs.",
      "Synonymous with excellence and precision in the market.",
      "Setting the standard for modern design and functionality.",
      "Committed to sustainability and top-tier production.",
      "Where technology meets everyday practicality.",
      "Crafting experiences that resonate with users worldwide.",
      "Pushing boundaries in creativity and innovation.",
      "A trusted name with a reputation for reliability.",
    ];

    const getRandomDescription = () => {
      return genericDescriptions[
        Math.floor(Math.random() * genericDescriptions.length)
      ];
    };

    const brands = brandNames.map((name) => ({
      name: name,
      description: getRandomDescription(),
    }));

    await Brand.bulkCreate(brands, options);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    let options = {};
    if (process.env.NODE_ENV === "production") {
      options.schema = process.env.SCHEMA;
    }

    const brandNames = [
      "Apple",
      "Nike",
      "Sony",
      "Adidas",
      "Samsung",
      "LG",
      "Puma",
      "Microsoft",
      "Google",
      "Amazon",
      "Dell",
      "HP",
      "Asus",
      "Acer",
      "Lenovo",
      "Panasonic",
      "Canon",
      "Nikon",
      "Toshiba",
      "Philips",
      "Sharp",
      "Fujitsu",
    ];

    await Brand.destroy({
      where: {
        name: {
          [Op.in]: brandNames,
        },
      },
      ...options,
    });
  },
};
