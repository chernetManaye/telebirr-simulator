function randomAlphaNum(length) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function generatePrepayId() {
  return "sim_" + Date.now() + "_" + randomAlphaNum(24);
}

module.exports = {
  generatePrepayId,
};
