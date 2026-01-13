const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { phone, pin, prepay_id } = req.body;

  // -----------------------------
  // Phone normalization
  // -----------------------------
  let normalizedPhone = phone.trim();

  if (normalizedPhone.startsWith("+")) {
    normalizedPhone = normalizedPhone.slice(1);
  }

  // -----------------------------
  // Phone validation (Ethiopia)
  // -----------------------------
  const phoneRegex = /^(09\d{8}|2519\d{8})$/;

  if (!phoneRegex.test(normalizedPhone)) {
    return res.redirect(
      `/payment/web/?prepay_id=${prepay_id}&error=Invalid phone number`
    );
  }

  // Normalize to 2519XXXXXXXX
  if (normalizedPhone.startsWith("09")) {
    normalizedPhone = "251" + normalizedPhone.slice(1);
  }

  // -----------------------------
  // PIN validation (6 digits)
  // -----------------------------
  const pinRegex = /^\d{6}$/;

  if (!pinRegex.test(pin)) {
    return res.redirect(
      `/payment/web/?prepay_id=${prepay_id}&error=PIN must be exactly 6 digits`
    );
  }

  // -----------------------------
  // Simulation success
  // -----------------------------
  console.log("SIM PAYMENT", {
    phone: normalizedPhone,
    pin,
    prepay_id,
  });

  res.redirect(`/payment/web/result.html?`);
});

module.exports = router;
