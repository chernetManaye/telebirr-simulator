const mongoose = require("mongoose");

async function mongoInit() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("mongoDB connected successfully");
}

module.exports = { mongoInit };
