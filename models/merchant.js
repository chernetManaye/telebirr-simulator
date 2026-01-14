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
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Merchant", merchantSchema);
