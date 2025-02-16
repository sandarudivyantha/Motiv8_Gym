const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: "User", // Reference to the User model
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentTime: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
  },
  billCode: {
    type: String,
    unique: true,
    required: true,
  },
  // Fields specific to monthly fees
  validFrom: {
    type: Date,
  },
  validTo: {
    type: Date,
  },
  paymentType: {
    type: String,
    enum: ["Admission", "Monthly"],
    required: true,
  },
});

// Generate a unique bill code before saving
paymentSchema.pre("validate", async function (next) {
  if (!this.billCode) {
    let isUnique = false;
    let newBillCode = "";

    while (!isUnique) {
      const count = await mongoose.models.Payment.countDocuments();
      newBillCode = `BILL${String(count + 1).padStart(6, "0")}`;

      // Check if the billCode already exists
      const existingBill = await mongoose.models.Payment.findOne({
        billCode: newBillCode,
      });
      if (!existingBill) {
        isUnique = true;
      }
    }
    this.billCode = newBillCode;
  }
  next();
});

module.exports = mongoose.model("Payment", paymentSchema);
