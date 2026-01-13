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

fs.writeFileSync("telebirr_private.pem", privateKey);
fs.writeFileSync("telebirr_public.pem", publicKey);
