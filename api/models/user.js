const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  email: { type: String },
  password: { type: String },
  tracking: [
    {
      companyName: { type: String },
      symbol: { type: String },
      mailSent: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
