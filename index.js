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

  // simulation only — no real validation
  console.log("SIM PAYMENT", { phone, pin, prepay_id });

  // redirect to result page
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
