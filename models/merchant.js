const mongoose = require("mongoose");

const merchantSchema = new mongoose.Schema(
  {
    appId: String,
    appSecret: String,
    merchantAppId: String,
    merchantCode: String,
    notifyUrl: String,
    redirectUrl: String,
    orders: [
      {
        _id: String,
        amount: String,
        callbackInfo: String,
        title: String,
        prepayId: String,
        transId: String,
        orderStatus: {
          type: String,
          enum: [
            "PAY_SUCCESS",
            "PAY_FAILED",
            "WAIT_PAY",
            "ORDER_CLOSED",
            "PAYING",
            "ACCEPTED",
            "REFUNDING",
            "REFUND_SUCCESS",
            "REFUND_FAILED",
          ],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Merchant", merchantSchema);
