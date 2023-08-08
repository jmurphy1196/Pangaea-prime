const crypto = require("crypto");

const generateRandomId = (length = 10) =>
  crypto.randomBytes(length).toString("hex");

module.exports = { generateRandomId };
