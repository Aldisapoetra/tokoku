const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
  cart: Object,
  isVerified: { type: Boolean, default: false },
  otpCode: String,
  otpExpires: Date
})

const Users = new mongoose.model("Users", userSchema)

module.exports = Users