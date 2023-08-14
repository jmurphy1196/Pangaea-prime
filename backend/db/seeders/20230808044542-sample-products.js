"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    try {
      queryInterface.bulkInsert(
        options,
        [
          {
            product_name: "Samsung Galaxy",
            description: "This is a sample product description.",
            price: 190.99,
            seller_id: 1,
            stock_quantity: 100,
            brand_id: 1,
          },
          {
            product_name: "Sample Product 2",
            description: "This is another sample product description.",
            price: 29.99,
            seller_id: 1,
            stock_quantity: 50,
            brand_id: 1,
          },
          {
            product_name: "Sample Product 3",
            description: "This is another sample product description.",
            price: 29.99,
            seller_id: 1,
            stock_quantity: 50,
            brand_id: 1,
          },
          {
            product_name: "Sample Product 4",
            description: "This is another sample product description.",
            price: 39.99,
            seller_id: 1,
            stock_quantity: 50,
            brand_id: 1,
          },
          {
            product_name: "Sample Product 5",
            description: "This is another sample product description.",
            price: 9.0,
            seller_id: 1,
            stock_quantity: 50,
            brand_id: 1,
          },
          {
            product_name: "Sample Product 6",
            description: "This is another sample product description.",
            price: 9.0,
            seller_id: 1,
            stock_quantity: 50,
            brand_id: 1,
          },
        ],
        {}
      );
    } catch (err) {
      console.log("ERROR", err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        product_name: {
          [Op.in]: [
            "Sample Product 1",
            "Sample Product 2",
            "Sample Product 3",
            "Sample Product 4",
            "Sample Product 5",
            "Sample Product 6",
          ],
        },
      },
      {}
    );
  },
};
