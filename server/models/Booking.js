const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  roomId:     { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkIn:    { type: Date, required: true },
  checkOut:   { type: Date, required: true },
  totalAmount:{ type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "expired"],
    default: "pending"
  },
  createdAt: { type: Date, default: Date.now }
},
{ timestamps: true });

bookingSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 15 * 60,
    partialFilterExpression: { paymentStatus: "pending" },
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
