// const crypto = require("crypto");
// const fs = require("fs");

// const publicKey = fs.readFileSync("telebirr_public.pem", "utf8");

// const isValid = crypto
//   .createVerify("RSA-SHA256")
//   .update(flatString)
//   .end()
//   .verify(publicKey, signature, "base64");
const { customAlphabet } = require("nanoid");

const nanoidNumeric = customAlphabet("0123456789", 14);

const express = require("express");
const router = express.Router();
const Merchant = require("../models/merchant");
const axios = require("axios");

function buildRedirect(base, query, extra = {}) {
  const params = new URLSearchParams();

  for (const [k, v] of Object.entries({ ...query, ...extra })) {
    if (v !== undefined && v !== null) {
      params.set(k, v);
    }
  }

  return `${base}?${params.toString()}`;
}

router.post("/", async (req, res) => {
  const { phone, pin } = req.body;
  const { appid, prepay_id } = req.query;

  // -----------------------------
  // Phone normalization
  // -----------------------------
  let normalizedPhone = phone.trim();

  if (normalizedPhone.startsWith("+")) {
    normalizedPhone = normalizedPhone.slice(1);
  }

  // -----------------------------
  // Phone validation (Ethiopia)
  // -----------------------------
  const phoneRegex = /^(09\d{8}|2519\d{8})$/;

  if (!phoneRegex.test(normalizedPhone)) {
    return res.redirect(
      buildRedirect("/web/", req.query, {
        version: "1.0",
        trade_type: "Checkout",
        error: "Invalid phone number",
      })
    );
  }

  // Normalize to 2519XXXXXXXX
  if (normalizedPhone.startsWith("09")) {
    normalizedPhone = "251" + normalizedPhone.slice(1);
  }

  // -----------------------------
  // PIN validation (6 digits)
  // -----------------------------
  const pinRegex = /^\d{6}$/;

  if (!pinRegex.test(pin)) {
    return res.redirect(
      buildRedirect("/web/", req.query, {
        version: "1.0",
        trade_type: "Checkout",
        error: "PIN must be exactly 6 digits",
      })
    );
  }

  const merchant = await Merchant.findOne({
    merchantAppId: appid,
  }).lean();

  const preOrder = merchant.orders.find(
    (order) => order.prepayId === prepay_id
  );

  if (!preOrder) {
    return res.redirect(
      buildRedirect("/web/", req.query, {
        version: "1.0",
        trade_type: "Checkout",
        error: "Order not found",
      })
    );
  }

  const transactionId = nanoidNumeric();

  // const payload = {
  //   notify_url: merchant.notifyUrl,
  //   appid: merchant.appId,
  //   notify_time: Date.now(),
  //   merch_code: merchant.merchantCode,
  //   merch_order_id: preOrder._id,
  //   payment_order_id: "00801104C911443200001002",
  //   total_amount: preOrder.amount,
  //   trans_id: transactionId,
  //   trans_currency: "ETB",
  //   trade_status: "Completed",
  //   trans_end_time: Date.now(),
  //   callback_info: preOrder.callbackInfo,
  //   sign: sign,
  //   sign_type: "SHA256WithRSA",
  // };

  await Merchant.findOneAndUpdate(
    {
      merchantAppId: appid,
      "orders.prepayId": prepay_id,
    },
    {
      $set: {
        "orders.$.transId": transactionId,
        "orders.$.orderStatus": "PAY_SUCCESS",
      },
    },
    {
      new: true,
    }
  );

  // // simulate notify_url (optional for now)
  // // await axios.post(Merchant.notifyUrl, payload);

  // // -----------------------------
  // // Simulation success
  // // -----------------------------

  res.redirect(
    `/web/result.html?amount=${preOrder.amount}&trans_id=${transactionId}&title=${preOrder.title}&redirect_url=${merchant.redirectUrl}`
  );
});

module.exports = router;
