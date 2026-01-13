const crypto = require("crypto");
const fs = require("fs");

const data = {
  method: "payment.preorder",
  timestamp: "1234567890",
  nonce_str: "abc",
  version: "1.0",
  sign: "JYyVqFAmdgBG4n1eBQYUwNlC...",
  sign_type: "SHA256WithRSA",
  biz_content: {
    notify_url: "https://example.com/notify",
    redirect_url: "https://example.com/redirect",
    appid: "1072905731584000",
    merch_code: "000000",
    merch_order_id: "order123",
    timeout_express: "120m",
    title: "Phone",
    total_amount: "12",
    trade_type: "Checkout",
    business_type: "BuyGoods",
    trans_currency: "ETB",
    payee_type: "3000",
    payee_identifier: "000000",
    payee_identifier_type: "04",
    callback_info: "From web",
  },
};

function flattenTelebirrParams(params) {
  const flat = {};

  for (const key in params) {
    if (
      key === "sign" ||
      key === "signType" ||
      key === "sign_type" ||
      params[key] === undefined ||
      params[key] === null ||
      params[key] === ""
    ) {
      continue;
    }

    if (key === "biz_content" && typeof params[key] === "object") {
      for (const bizKey in params[key]) {
        const value = params[key][bizKey];
        if (value !== undefined && value !== null && value !== "") {
          flat[bizKey] = value;
        }
      }
    } else {
      flat[key] = params[key];
    }
  }

  return flat;
}

function buildSignString(params) {
  const flat = flattenTelebirrParams(params);

  return Object.keys(flat)
    .sort() // A–Z
    .map((key) => `${key}=${flat[key]}`)
    .join("&");
}

const flatObject = flattenTelebirrParams(data);
const flatString = buildSignString(flatObject);

const privateKey = fs.readFileSync("telebirr_private.pem", "utf8");

const signature = crypto
  .createSign("RSA-SHA256")
  .update(flatString)
  .end()
  .sign(privateKey, "base64");

// const publicKey = fs.readFileSync("telebirr_public.pem", "utf8");

// const isValid = crypto
//   .createVerify("RSA-SHA256")
//   .update(flatString)
//   .end()
//   .verify(publicKey, signature, "base64");
