const mongoose = require("mongoose")

/**
 * Creating a schema for Users
 */
const userSchema = new mongoose.Schema({
  firstName: {
    type: String, // use email as default value (abc@gmail.com => abc)
  },
  lastName: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: '',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  code: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  modifiedAt: {
    type: Date,
    default: Date.now(),
  },
})

const userModel = mongoose.model("User", userSchema) 

module.exports = userModel