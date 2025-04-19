// bookingController.js
const Booking = require("../models/Booking");
const Room = require("../models/Room");

// Helper to check overlap
const isOverlapping = (existing, checkIn, checkOut) => {
  return (
    (checkIn < existing.checkOut && checkOut > existing.checkIn)
  );
};

// Create Booking
const createBooking = async (req, res) => {
  const { roomId, checkIn, checkOut } = req.body;
  const userId = req.user.userId;

  try {
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const existingBookings = await Booking.find({
      roomId,
      paymentStatus: { $in: ["pending", "paid"] }
    });

    const overlap = existingBookings.some(booking =>
      isOverlapping(booking, new Date(checkIn), new Date(checkOut))
    );

    if (overlap) return res.status(400).json({ message: "Room is already booked at that time" });

    const durationInHours = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60));
    const totalAmount = durationInHours * room.pricePerHour;

    const newBooking = await Booking.create({
      userId,
      roomId,
      checkIn,
      checkOut,
      totalAmount,
      paymentStatus: "pending",
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// Get bookings for logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.userId }).populate("roomId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
};

// Admin: Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("roomId userId");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err.message });
  }
};

// Simulate marking as paid
const markAsPaid = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, {
      paymentStatus: "paid",
    }, { new: true });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark as paid", error: err.message });
  }
};

module.exports = {
  createBooking,
  getUserBookings,
  getAllBookings,
  markAsPaid,
};
