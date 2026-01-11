function pad(n) {
  return n.toString().padStart(2, "0");
}

function formatTelebirrDate(date) {
  return (
    date.getFullYear() +
    pad(date.getMonth() + 1) +
    pad(date.getDate()) +
    pad(date.getHours()) +
    pad(date.getMinutes()) +
    pad(date.getSeconds())
  );
}

function randomHex(length) {
  const chars = "abcdef0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function generateFabricToken() {
  const now = new Date();
  const expires = new Date(now.getTime() + 60 * 60 * 1000);

  return {
    effectiveDate: formatTelebirrDate(now),
    expirationDate: formatTelebirrDate(expires),
    token: "Bearer " + randomHex(32),
  };
}

module.exports = {
  generateFabricToken,
};
