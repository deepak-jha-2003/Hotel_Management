const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const contactRoutes = require("./routes/contactRoutes"); 
dotenv.config();
connectDB(); // Connect to PostgreSQL

const app = express();

// Middleware
app.use(cors()); // Allows Frontend to talk to Backend
app.use(express.json({ limit: "50mb" })); // Increased limit for image uploads

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contacts", contactRoutes); 

const PORT = process.env.PORT || 5000;


sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Database & Tables synced!");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});