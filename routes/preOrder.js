const express = require("express");
const { generatePrepayId } = require("../utils/prepay");

const router = express.Router();

/**
 * Simulated Telebirr Create Order API
 * POST /payment/v1/merchant/preOrder
 */
router.post("/preOrder", (req, res) => {
  const auth = req.headers.authorization;
  const appKey = req.headers["x-app-key"];
  const body = req.body || {};

  // ---- basic header validation ----
  if (!auth) {
    return res.status(401).json({
      result: "FAIL",
      code: "401",
      msg: "Missing Authorization header",
    });
  }

  if (!appKey) {
    return res.status(400).json({
      result: "FAIL",
      code: "400",
      msg: "Missing X-APP-Key",
    });
  }

  // ---- body validation ----
  if (body.method !== "payment.preorder") {
    return res.status(400).json({
      result: "FAIL",
      code: "INVALID_METHOD",
      msg: "Invalid method",
    });
  }

  if (!body.biz_content) {
    return res.status(400).json({
      result: "FAIL",
      code: "INVALID_REQUEST",
      msg: "biz_content is required",
    });
  }

  const { merch_order_id, total_amount, notify_url, appid, merch_code } =
    body.biz_content;

  if (
    !merch_order_id ||
    !total_amount ||
    !notify_url ||
    !appid ||
    !merch_code
  ) {
    return res.status(400).json({
      result: "FAIL",
      code: "INVALID_BIZ_CONTENT",
      msg: "Missing required biz_content fields",
    });
  }

  // ---- generate simulated response ----
  const prepayId = generatePrepayId();

  res.json({
    result: "SUCCESS",
    code: "0",
    msg: "success",
    nonce_str: randomNonce(),
    sign: "SIMULATED_SIGNATURE",
    sign_type: "SHA256WithRSA",
    biz_content: {
      merch_order_id,
      prepay_id: prepayId,
    },
  });
});

function randomNonce() {
  return Math.random().toString(36).substring(2, 18);
}

module.exports = router;
