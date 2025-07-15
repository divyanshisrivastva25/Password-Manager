const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  username: String,
  password: String,
  createdAt: {
    type: Date, 
    default: Date.now,
  },
});

module.exports = mongoose.model("Password", passwordSchema);
