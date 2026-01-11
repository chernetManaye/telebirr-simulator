const express = require("express");
const { generateFabricToken } = require("../utils/token");

const router = express.Router();
// c4182ef8-9249-458a-985e-06d191f4d505 fabricAppId
// fad0f06383c6297f545876694b974599 appSecret
router.post("/token", (req, res) => {
  const { appSecret } = req.body || {};

  if (!appSecret) {
    return res.status(400).json({
      errorCode: "INVALID_REQUEST",
      errorMsg: "appSecret is required",
    });
  }

  const token = generateFabricToken();
  res.status(200).json(token);
});

module.exports = router;
