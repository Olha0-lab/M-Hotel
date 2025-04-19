const Room = require("../models/Room");

// Create Room
const createRoom = async (req, res) => {
  const { roomNumber, type, pricePerHour } = req.body;

  try {
    const existing = await Room.findOne({ roomNumber });
    if (existing) return res.status(400).json({ message: "Room already exists" });

    const newRoom = await Room.create({ roomNumber, type, pricePerHour });
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: "Failed to create room", error: err.message });
  }
};

// Get All Rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms", error: err.message });
  }
};

// Get One Room
const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(room);
  } catch (err) {
    res.status(500).json({ message: "Error fetching room", error: err.message });
  }
};

// Update Room
const updateRoom = async (req, res) => {
  try {
    const updated = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Room not found" });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete Room
const deleteRoom = async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
