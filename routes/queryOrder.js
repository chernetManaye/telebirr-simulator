const express = require("express");
const router = express.Router();
const Merchant = require("../models/merchant");

function randomNonce() {
  return Math.random().toString(36).substring(2, 18);
}

router.post("/", async (req, res) => {
  const { appid, merch_order_id } = req.body.biz_content;

  const merchant = await Merchant.findOne({
    merchantAppId: appid,
  });

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

  const data = {
    result: "SUCCESS",
    code: "0",
    msg: "success",
    nonce_str: randomNonce(),
    sign: "dmeUb5r9PF9aBy6/1D54XjELYbKcCzGF6e1yxOA4/WIy1on0TpyD.....",
    sign_type: "SHA256WithRSA",
    biz_content: {
      merch_order_id: merch_order_id,
      order_status: preOrder.orderStatus,
      payment_order_id: preOrder.prepayId,
      trans_time: "2025-10-13 19:19:38",
      trans_currency: "ETB",
      total_amount: preOrder.amount,
      trans_id: preOrder.transId,
    },
  };

  res.status(200).json(data);
});

module.exports = router;
