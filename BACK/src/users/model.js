const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    index: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["admin", "user", "visitor"],
    required: true,
    default: "visitor"
  }
});

// REST

const User = mongoose.model("User", userSchema);

module.exports = User;
