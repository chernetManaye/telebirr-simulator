const express = require("express");
const path = require("path");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");
const payRoute = require("./routes/pay");
const completePaymentRoute = require("./routes/completePayment");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/payment/web", express.static(path.join(__dirname, "public")));

app.use("/payment/web", payRoute);

app.post("/payment/web", completePaymentRoute);

app.use("/payment/v1", fabricTokenRoute);
app.use("/payment", preOrderRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Telebirr Simulator running on port", PORT);
});
