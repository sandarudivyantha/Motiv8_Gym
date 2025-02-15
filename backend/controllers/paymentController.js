const Payment = require("../models/paymentModel");
const User = require("../models/userModel");

// @desc Create a new admission fee payment
// @route POST /payments/admission
// @access Private (Admin, Trainer)
const createAdmissionPayment = async (req, res) => {
  const { username, amount } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the admission payment with user details
    const payment = await Payment.create({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      paymentDate: new Date(),
      paymentTime: new Date().toLocaleTimeString(),
      amount,
      status: "Active",
      paymentType: "Admission",
    });

    res.status(201).json({ message: "Admission payment created", payment });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to create admission payment",
        error: error.message,
      });
  }
};

// @desc Create a new monthly fee payment
// @route POST /payments/monthly
// @access Private (Admin, Trainer)
const createMonthlyPayment = async (req, res) => {
  const { username, amount, validFrom, validTo } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the monthly payment with user details
    const payment = await Payment.create({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      paymentDate: new Date(),
      paymentTime: new Date().toLocaleTimeString(),
      amount,
      validFrom,
      validTo,
      status: "Active",
      paymentType: "Monthly",
    });

    res.status(201).json({ message: "Monthly payment created", payment });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to create monthly payment",
        error: error.message,
      });
  }
};

// @desc Get all payments
// @route GET /payments
// @access Private (Admin, Trainer)
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().lean();
    res.json(payments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch payments", error: error.message });
  }
};

module.exports = {
  createAdmissionPayment,
  createMonthlyPayment,
  getAllPayments,
};
