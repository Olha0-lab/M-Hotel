const Notification = require("../models/Notification");

// GET /api/notifications
const getNotifications = async (req, res) => {
  try {
    const notes = await Notification.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "bookingId",
        select: "roomId userId",
        populate: [
          { path: "roomId", select: "roomNumber" },
          { path: "userId", select: "username" },
        ],
      });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch notifications", error: err.message });
  }
};

// PATCH /api/notifications/:id/read
const markNotificationRead = async (req, res) => {
  try {
    const note = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Notification not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Failed to mark read", error: err.message });
  }
};

// GET /api/notifications/unread-count
const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ read: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch count", error: err.message });
  }
};

module.exports = {
  getNotifications,
  markNotificationRead,
  getUnreadCount,
};
