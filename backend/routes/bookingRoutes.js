const express = require("express");
const { 
  createBooking, 
  getAllBookings, 
  updateBookingStatus, 
  getMyBookings,
  deleteBooking 
} = require("../controllers/bookingController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/")
  .post(createBooking)
  .get(protect, admin, getAllBookings);

router.get("/mybookings", getMyBookings);

router.route("/:id")
  .put(protect, admin, updateBookingStatus)
  .delete(protect, admin, deleteBooking); 

module.exports = router;