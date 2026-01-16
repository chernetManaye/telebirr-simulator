require("dotenv").config();
const express = require("express");
const path = require("path");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");
const payRoute = require("./routes/pay");
const completePaymentRoute = require("./routes/completePayment");
const queryOrderRoute = require("./routes/queryOrder");
const refundOrderRoute = require("./routes/refundOrder");
const { mongoInit } = require("./db");

const http = require("http");

const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/web", express.static(path.join(__dirname, "public")));
app.use("/payment/pay", payRoute);
app.use("/payment/complete", completePaymentRoute);
app.use("/payment/v1/token", fabricTokenRoute);
app.use("/payment/v1/merchant/preOrder", preOrderRoute);
app.use("/payment/v1/merchant/refund", refundOrderRoute);
app.use("/payment/v1/merchant/queryOrder", queryOrderRoute);

const PORT = process.env.PORT || 3000;

mongoInit()
  .then(() =>
    server.listen(PORT, "0.0.0.0", () => {
      console.log("Telebirr Simulator running on port", PORT);
    })
  )
  .catch((err) => console.log(err));
