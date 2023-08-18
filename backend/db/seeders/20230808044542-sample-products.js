"use strict";

const { Brand } = require("../models"); // Adjust the path to your models directory if it's different

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    const products = [];

    const adjectives = [
      "Mega",
      "Ultra",
      "Super",
      "Hyper",
      "Turbo",
      "Alpha",
      "Beta",
      "Pro",
      "Max",
      "Elite",
      "Prime",
      "Eco",
      "Nano",
      "Quantum",
      "Pixel",
    ];
    const nouns = [
      "Tech",
      "Gadget",
      "Device",
      "Gear",
      "Widget",
      "Machine",
      "Tool",
      "Apparatus",
      "Instrument",
      "Contraption",
      "Engine",
      "Mechanism",
      "Appliance",
      "Implement",
      "Utensil",
    ];

    const brands = await Brand.findAll({ attributes: ["id"] });
    const brandIds = brands.map((brand) => brand.id);
    const main_images = [
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-2.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-3.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-11.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-5.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-6.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-7.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-8.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-9.png",
      "https://pangaea-prime.s3.us-west-1.amazonaws.com/sample-10.png",
    ];

    // Generate 56 products
    for (let i = 1; i <= 56; i++) {
      let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      let noun = nouns[Math.floor(Math.random() * nouns.length)];
      let productName = `${adjective} ${noun} ${i}`;

      let description = `This is a description for ${productName}.`;
      let price = (Math.random() * 100).toFixed(2);
      let sellerId = Math.floor(Math.random() * 3) + 1;
      let stockQuantity = Math.floor(Math.random() * 100) + 1; // Random stock quantity between 1 and 100
      let brandId = brandIds[Math.floor(Math.random() * brandIds.length)];
      let randomImage =
        main_images[Math.floor(Math.random() * main_images.length)];

      products.push({
        product_name: productName,
        description: description,
        price: price,
        seller_id: sellerId,
        stock_quantity: stockQuantity,
        brand_id: brandId,
        main_image: randomImage,
      });
    }

    try {
      await queryInterface.bulkInsert(options, products, {});
    } catch (err) {
      console.log("ERROR", err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    const Op = Sequelize.Op;
    const productNames = [];
    for (let i = 1; i <= 56; i++) {
      let adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      let noun = nouns[Math.floor(Math.random() * nouns.length)];
      let productName = `${adjective} ${noun} ${i}`;
      productNames.push(productName);
    }
    return queryInterface.bulkDelete(
      options,
      {
        product_name: {
          [Op.in]: productNames,
        },
      },
      {}
    );
  },
};
