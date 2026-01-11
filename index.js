const express = require("express");
const fabricTokenRoute = require("./routes/fabricToken");
const preOrderRoute = require("./routes/preOrder");

const app = express();

app.use(express.json());

app.use("/payment", fabricTokenRoute);
app.use("/payment", preOrderRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Telebirr Simulator running on port", PORT);
});
