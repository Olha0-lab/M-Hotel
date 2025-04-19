const Booking = require("../models/Booking");
const Notification = require("../models/Notification");

const expirePendingBookings = async () => {
  const EXPIRY_MINUTES = 15;
  const cutoff = new Date(Date.now() - EXPIRY_MINUTES * 60 * 1000);

  try {
    // 1. Find pending bookings older than cutoff
    const toExpire = await Booking.find({
      paymentStatus: "pending",
      createdAt: { $lt: cutoff },
    }).populate("roomId userId");

    if (toExpire.length === 0) return;

    // 2. Mark them expired
    const ids = toExpire.map((b) => b._id);
    await Booking.updateMany(
      { _id: { $in: ids } },
      { $set: { paymentStatus: "expired" } }
    );

    // 3. Create notifications for admin
    const notes = toExpire.map((b) => ({
      bookingId: b._id,
      message: `Booking by ${b.userId.username} for Room ${b.roomId.roomNumber} expired.`,
    }));
    await Notification.insertMany(notes);

    console.log(`Expired ${toExpire.length} bookings and created notifications.`);
  } catch (err) {
    console.error("Error expiring bookings:", err.message);
  }
};

module.exports = expirePendingBookings;
