const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { redirect_url } = req.query;

  res.redirect(redirect_url);
});

module.exports = router;
