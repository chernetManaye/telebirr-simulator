const crypto = require("crypto");

function generatePrepayId() {
  return crypto.randomBytes(20).toString("hex");
}

module.exports = {
  generatePrepayId,
};
