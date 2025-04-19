const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true, unique: true },
  type:       { type: String, required: true }, // e.g., single, double, suite
  pricePerHour: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
