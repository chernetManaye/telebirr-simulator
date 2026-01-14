const mongoose = require("mongoose");

async function mongoInit() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("mongoDB connected successfully");
}

module.exports = { mongoInit };
