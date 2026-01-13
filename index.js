const express = require("express");
const path = require("path");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");
const payRoute = require("./routes/pay");
const completePaymentRoute = require("./routes/completePayment");

const app = express();

// https://telebirr-node-simulator.onrender.com
// https://telebirr-node-simulator.onrender.com/web

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/payment/web/?
// serve index.html
app.use("/payment/web", express.static(path.join(__dirname, "public")));
app.use("/payment/web/pay", payRoute);
app.use("/payment/web/complete", completePaymentRoute);
app.use("/payment/v1/token", fabricTokenRoute);
app.use("/payment/v1/merchant/preOrder", preOrderRoute);
// app.use("/payment/v1/merchant/refund");
// app.use("/payment/v1/merchant/queryOrder");

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Telebirr Simulator running on port", PORT);
});
