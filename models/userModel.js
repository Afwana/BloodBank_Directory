const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Role is mandatory, please choose one."],
    enum: ["admin", "organisation", "user", "hospital"],
  },
  name: {
    type: String,
    required: function () {
      if (this.role === "user" || this.role === "admin") {
        return true;
      }
      return false;
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
});
