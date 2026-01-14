const express = require("express");
const router = express.Router();
const Merchant = require("../models/merchant");
const { customAlphabet } = require("nanoid");

const nanoidNumeric = customAlphabet("0123456789", 14);

router.post("/", async (req, res) => {
  const {
    appid,
    merch_order_id,
    refund_request_no,
    refund_reason,
    actual_amount,
  } = req.body.biz_content;

  const transactionId = nanoidNumeric();
  const merchant = await Merchant.findOneAndUpdate(
    {
      merchantAppId: appid,
      "orders.transId": refund_request_no,
    },
    {
      $set: {
        "orders.$.refundTransId": transactionId,
        "orders.$.orderStatus": "REFUND_SUCCESS",
        "orders.$.refundReason": refund_reason,
        "orders.$.refundAmount": actual_amount,
      },
    },
    {
      new: true,
    }
  );

  if (!merchant) {
    return res.json({
      errorCode: "1",
      errorMsg: "merchant not found",
    });
  }

  const preOrder = merchant.orders.find(
    (order) => order._id === merch_order_id
  );

  if (!preOrder) {
    return res.json({
      errorCode: "1",
      errorMsg: "preOrder not found",
    });
  }
  if (!preOrder.transId) {
    return res.json({
      errorCode: "1",
      errorMsg: "Can not refund non existed transaction",
    });
  }
  const data = {
    result: "SUCCESS",
    code: "0",
    msg: "success",
    nonce_str: "9f8e7d6c5b4a3210",
    sign: "mD7y4ZP8Qn2O5u7fJxY9Q6+gKc5E0VZr2y3K0X9M8c5A0w==",
    sign_type: "SHA256WithRSA",
    biz_content: {
      merch_code: merchant.merchantCode,
      merch_order_id: preOrder._id,
      trans_order_id: preOrder.transId,
      refund_order_id: preOrder.refundTransId,
      refund_amount: preOrder.refundAmount,
      refund_currency: "ETB",
      refund_status: preOrder.orderStatus,
      refund_time: Date.now(),
    },
  };

  res.status(200).json(data);
});

module.exports = router;
