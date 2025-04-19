// bookingRoutes.js
const express = require("express");
const router = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware"); // Correct import
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  markAsPaid,
} = require("../controllers/bookingController");

// Guest routes
router.post("/createBooking", protect, createBooking);
router.get("/my", protect, getUserBookings);

// Admin routes
router.get("/", protect, getAllBookings);

// For testing: simulate payment success
router.patch("/:id/pay", protect, markAsPaid);

module.exports = router;
