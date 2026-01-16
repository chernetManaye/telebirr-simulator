const express = require("express");
const { generateFabricToken } = require("../utils/token");
const Merchant = require("../models/merchant");

const router = express.Router();

/**
 * Simulated Telebirr Create Order API
 * POST /payment/v1/token
 */

router.post("/", async (req, res) => {
  console.log("headers:", req.headers);
  console.log("body", req.body);
  const { appSecret } = req.body || {};
  const appId = req.headers["x-app-key"];

  if (!appSecret) {
    return res.status(400).json({
      errorCode: "INVALID_REQUEST",
      errorMsg: "appSecret is required",
    });
  }
  if (!appId) {
    return res.status(400).json({
      result: "FAIL",
      code: "401",
      msg: "Missing Authorization header X-APP-Key",
    });
  }

  const merchant = await Merchant.create({
    appSecret,
    appId,
  });

  console.log(merchant);

  const token = generateFabricToken();
  res.status(200).json(token);
});

module.exports = router;
