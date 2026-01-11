const express = require("express");
const { generateFabricToken } = require("../utils/token");

const router = express.Router();

router.post("/token", (req, res) => {
  const { appSecret } = req.body || {};
  const appKey = req.headers["x-app-key"];

  if (!appSecret) {
    return res.status(400).json({
      errorCode: "INVALID_REQUEST",
      errorMsg: "appSecret is required",
    });
  }
  if (!appKey) {
    return res.status(400).json({
      result: "FAIL",
      code: "401",
      msg: "Missing Authorization header",
    });
  }

  const token = generateFabricToken();
  res.status(200).json(token);
});

module.exports = router;
