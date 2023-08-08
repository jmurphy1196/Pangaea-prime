"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.bulkInsert(
      options,
      [
        {
          product_name: "Sample Product 1",
          description: "This is a sample product description.",
          price: 19.99,
          seller_id: 1,
          stock_quantity: 100,
          main_image: "https://example.com/sample-product-1.jpg",
          additional_images:
            "https://example.com/sample-product-1-additional.jpg",
        },
        {
          product_name: "Sample Product 2",
          description: "This is another sample product description.",
          price: 29.99,
          seller_id: 1,
          stock_quantity: 50,
          main_image: "https://example.com/sample-product-2.jpg",
          additional_images: JSON.stringify({
            urls: [
              "https://example.com/sample-product-1-additional1.jpg",
              "https://example.com/sample-product-1-additional2.jpg",
            ],
          }),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        product_name: { [Op.in]: ["Sample Product 1", "Sample Product 2"] },
      },
      {}
    );
  },
};
