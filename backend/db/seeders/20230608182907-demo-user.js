"use strict";
const bcrypt = require("bcryptjs");
const { User } = require("../models"); // You need to provide the correct path to your User model

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.individualHooks = true;
    const users = [
      {
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
        firstName: "test",
        lastName: "test",
      },
      {
        email: "user1@user.io",
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync("password2"),
        firstName: "test",
        lastName: "test",
      },
      {
        email: "user2@user.io",
        username: "FakeUser2",
        hashedPassword: bcrypt.hashSync("password3"),
        firstName: "test",
        lastName: "test",
      },
    ];

    return User.bulkCreate(users, options);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return User.destroy({
      where: {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
    });
  },
};
