"use strict";
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
  options.tableName = "OrderProducts";
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "OrderProducts",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        order_id: {
          type: Sequelize.INTEGER,
          references: {
            model: "Orders",
            key: "id",
          },
        },
        // product_id: {
        //   type: Sequelize.INTEGER,
        //   references: {
        //     model: "Products",
        //     key: "id",
        //   },
        // },
        product_name: {
          type: Sequelize.STRING,
          validate: {
            notEmpty: true,
            len: [1, 255],
          },
        },
        price: {
          type: Sequelize.DECIMAL,
          validate: {
            isDecimal: true,
            min: 0,
            max: 99999,
          },
        },
        product_id: Sequelize.INTEGER,
        seller_id: Sequelize.INTEGER,
        main_image: Sequelize.STRING,
        quantity: Sequelize.INTEGER,
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      options
    );
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "OrderProducts";
    await queryInterface.dropTable("OrderProducts");
  },
};
