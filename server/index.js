const express = require("express");
const fabricTokenRoute = require("./routes/fabricToken");

const app = express();

app.use(express.json());

app.use("/payment", fabricTokenRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Telebirr Simulator running on port", PORT);
});
