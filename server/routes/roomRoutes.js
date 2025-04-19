const express = require("express");
const router = express.Router();
const {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const { protect, isAdmin } = require("../middleware/authMiddleware");

// Public: Get all rooms or single room
router.get("/", getAllRooms);
router.get("/:id", getRoomById);

// Admin only: Create, update, delete
router.post("/", protect, isAdmin, createRoom);
router.put("/:id", protect, isAdmin, updateRoom);
router.delete("/:id", protect, isAdmin, deleteRoom);

module.exports = router;
