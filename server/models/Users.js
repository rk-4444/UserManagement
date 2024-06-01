// Import Mongoose
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
  },
  contact: {
    type: Number,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
});

// Create the user model
const User = mongoose.model("users", userSchema);

// Export the model
module.exports = User;
