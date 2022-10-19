const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: String, // String is shorthand for {type: String}
  role: String,
  emailId: { type: String, required: true },
  date: { type: Date, default: Date.now },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", user);
