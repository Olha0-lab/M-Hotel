const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { createPaymentIntent } = require("../controllers/paymentController");

// POST /api/payments/create-payment-intent
router.post("/create-payment-intent", protect, createPaymentIntent);

module.exports = router;
