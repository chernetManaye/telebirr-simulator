const express = require("express");
const path = require("path");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");
const payRoute = require("./routes/pay");
const completePaymentRoute = require("./routes/completePayment");
const queryOrderRoute = require("./routes/queryOrder");

const { mongoInit } = require("./db");

const http = require("http");

const app = express();

const server = http.createServer(app);

// https://telebirr-node-simulator.onrender.com
// https://telebirr-node-simulator.onrender.com/web

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/payment/web/?
app.use("/payment/web", express.static(path.join(__dirname, "public")));
app.use("/payment/web/pay", payRoute);
app.use("/payment/web/complete", completePaymentRoute);
app.use("/payment/v1/token", fabricTokenRoute);
app.use("/payment/v1/merchant/preOrder", preOrderRoute);
// app.use("/payment/v1/merchant/refund");
app.use("/payment/v1/merchant/queryOrder", queryOrderRoute);

const PORT = process.env.PORT || 3000;

mongoInit()
  .then(() =>
    server.listen(PORT, "0.0.0.0", () => {
      console.log("Telebirr Simulator running on port", PORT);
    })
  )
  .catch((err) => console.log(err));
