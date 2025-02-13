const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: { type: String, required: true, unique: true },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: function (v) {
          return v.length === 10; // Exactly 10 digits
        },
        msg: "Phone number must be exactly 10 digits.",
      },
      {
        validator: function (v) {
          return /^\d+$/.test(v); // Only digits allowed
        },
        msg: "Phone number must contain only digits.",
      },
    ],
  },
  password: {
    type: String,
    required: true,
  },
  roles: {
    type: [String],
    enum: ["Admin", "Trainer", "Member"],
    default: ["Member"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  active: {
    type: Boolean,
    default: true,
  },
});

// If changed: Automatically update `updatedAt` before saving
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model("User", userSchema);
