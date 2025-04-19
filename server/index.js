require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require("cors");
const app = express();

// after other requires...
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const roomRoutes = require("./routes/roomRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/payments", paymentRoutes);

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {console.log("MongoDB connected");
  app.listen(PORT, () => {console.log(`Server running on port ${PORT}`);});

    // Schedule job: run expirePendingBookings every minute
     const expirePendingBookings = require("./jobs/expirePendingBookings");
     cron.schedule("* * * * *", () => {
       expirePendingBookings();
     });
     console.log("Scheduled expirePendingBookings to run every minute.");

  })
  .catch((err) => console.error(err));
  
  const expirePendingBookings = require("./jobs/expirePendingBookings");
  setInterval(() => {
    expirePendingBookings();
  }, 60 * 1000); // Every 1 minute
  
