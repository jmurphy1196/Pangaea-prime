const { Brand } = require("../db/models");
const { checkResourceExists } = require("../util/checkResourceGenerator");

const checkBrandExists = checkResourceExists("id", Brand, "brand");

module.exports = {
  checkBrandExists,
};
