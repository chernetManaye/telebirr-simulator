const express = require("express");
const { generateFabricToken } = require("../utils/token");

const router = express.Router();

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
