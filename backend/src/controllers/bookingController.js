const Booking = require("../models/Booking");
const Expert = require("../models/Expert");
const asyncHandler = require("../middleware/asyncHandler");


// ================================
// 🔥 CREATE BOOKING (Advanced Validation)
// ================================
exports.createBooking = asyncHandler(async (req, res) => {
  const { expertId, name, email, phone, date, timeSlot } = req.body;

  // ✅ Required Fields Check
  if (!expertId || !name || !email || !phone || !date || !timeSlot) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // ✅ Name Validation
  if (name.trim().length < 3) {
    res.status(400);
    throw new Error("Name must be at least 3 characters long");
  }

  // ✅ Email Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  // ✅ Phone Validation (10 digits)
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400);
    throw new Error("Phone number must be exactly 10 digits");
  }

  // ✅ Check Expert Exists
  const expert = await Expert.findById(expertId);
  if (!expert) {
    res.status(404);
    throw new Error("Expert not found");
  }

  try {
    const booking = await Booking.create({
      expertId,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      date,
      timeSlot,
    });

    // 🔥 Real-time Update
    const io = req.app.get("io");
    if (io) {
      io.emit("slotBooked", { expertId, date, timeSlot });
    }

    res.status(201).json(booking);

  } catch (error) {
    // 🔥 Duplicate Slot Protection
    if (error.code === 11000) {
      res.status(400);
      throw new Error("This time slot is already booked.");
    }
    throw error;
  }
});


// ================================
// 🔍 GET BOOKINGS BY EMAIL
// ================================
exports.getBookingsByEmail = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  const bookings = await Booking.find({
    email: email.toLowerCase(),
  }).populate("expertId");

  res.json(bookings);
});


// ================================
// 🔄 UPDATE BOOKING STATUS
// ================================
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const allowedStatuses = ["Pending", "Confirmed", "Completed"];

  if (!allowedStatuses.includes(status)) {
    res.status(400);
    throw new Error("Invalid booking status");
  }

  const booking = await Booking.findById(req.params.id);

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  booking.status = status;
  await booking.save();

  res.json(booking);
});
