const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const verifyJWT = require("../middleware/verifyJWT");
const verifyRoles = require("../middleware/verifyRoles");

router.use(verifyJWT);

// Only Admin and Trainer can access these routes
router.use(verifyRoles("Admin", "Trainer"));

router
  .route("/")
  .get(paymentController.getAllPayments);

router
  .route("/admission")
  .post(paymentController.createAdmissionPayment);

router
  .route("/monthly")
  .post(paymentController.createMonthlyPayment);

router
  .route("/:id")
  .get(paymentController.getPaymentById)
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

module.exports = router;