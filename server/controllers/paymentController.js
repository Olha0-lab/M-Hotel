const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking");

exports.createPaymentIntent = async (req, res) => {
  const { bookingId } = req.body;
  try {
    // Fetch booking to get amount
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.paymentStatus !== "pending") {
      return res.status(400).json({ message: "Booking not pending payment" });
    }

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // in cents
      currency: "usd",
      metadata: { bookingId: booking._id.toString() },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "PaymentIntent creation failed", error: err.message });
  }
};
