const crypto = require("crypto");
const fs = require("fs");

const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs1",
    format: "pem",
  },
});

// Save to files
fs.writeFileSync("telebirr_private.pem", privateKey);
fs.writeFileSync("telebirr_public.pem", publicKey);

console.log("Keys generated:");
console.log("✔ telebirr_private.pem");
console.log("✔ telebirr_public.pem");
