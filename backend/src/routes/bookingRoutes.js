const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const {
  createBooking,
  getBookingsByEmail,
  updateBookingStatus,
} = require("../controllers/bookingController");


// 🔥 IMPORTANT: This route MUST come before router.get("/")
router.get("/expert/:expertId", async (req, res) => {
  try {
    const bookings = await Booking.find({
      expertId: req.params.expertId,
    });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Other routes
router.post("/", createBooking);
router.get("/", getBookingsByEmail);
router.patch("/:id/status", updateBookingStatus);

module.exports = router;
