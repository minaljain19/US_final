const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  mobile: {
    type: Number,
    required: true,
    unique: true,
    min: 10,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  password: { type: String, required: true },
});
const User = new mongoose.model("newUser", userSchema);
module.exports = User;
