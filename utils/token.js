const crypto = require("crypto");

function pad(n) {
  return n.toString().padStart(2, "0");
}

function formatTelebirrDate(date) {
  return (
    date.getUTCFullYear() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds())
  );
}

function generateFabricToken() {
  const now = new Date();
  const expires = new Date(now.getTime() + 60 * 60 * 1000);

  return {
    effectiveDate: formatTelebirrDate(now),
    expirationDate: formatTelebirrDate(expires),
    token: "Bearer " + crypto.randomBytes(16).toString("hex"),
  };
}

module.exports = {
  generateFabricToken,
};
