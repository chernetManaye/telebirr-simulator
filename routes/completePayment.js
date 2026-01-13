const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { prepay_id } = req.body;

  // 🔔 simulate notify_url (optional for now)
  // await axios.post(merchantNotifyUrl, payload)

  // 🔁 redirect user back to merchant
  const redirectUrl =
    "https://merchant.example.com/payment-result" +
    "?status=SUCCESS" +
    "&prepay_id=" +
    prepay_id;

  res.redirect(redirectUrl);
});

module.exports = router;
