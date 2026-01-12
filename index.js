const express = require("express");
const path = require("path");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/payment/web", express.static(path.join(__dirname, "public")));

app.post("/payment/web/pay", (req, res) => {
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

  res.redirect(`/payment/web/result.html?prepay_id=${prepay_id}`);
});

app.post("/payment/web/complete", async (req, res) => {
  const { prepay_id } = req.body;

  console.log("SIM COMPLETE PAYMENT", prepay_id);

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

app.use("/payment", fabricTokenRoute);
app.use("/payment", preOrderRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Telebirr Simulator running on port", PORT);
});
