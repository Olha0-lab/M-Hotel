const express = require('express');
const router = express.Router();
const Notification = require('../models/notification');

// @desc    Get all notifications (admin or user-specific later)
// @route   GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching notifications' });
  }
});

// @desc    Create new notification
// @route   POST /api/notifications
router.post('/', async (req, res) => {
  const { title, message, type, userId } = req.body;

  try {
    const newNotification = new Notification({ title, message, type, userId });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create notification' });
  }
});

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
router.patch('/:id/read', async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notification' });
  }
});

module.exports = router;
