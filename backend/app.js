const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// middleware to read JSON
app.use(express.json());
app.use(cors());

// temporary storage (NOT permanent)
let bookings = [];

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET all bookings
app.get("/bookings", (req, res) => {
  res.json(bookings);
});

// POST booking
app.post("/book-room", (req, res) => {
  const { name, email, room, date } = req.body;

  // validation
  if (!name || !email || !room || !date) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // check if room already booked for that date
  const exists = bookings.find(
    (b) => b.room === room && b.date === date
  );

  if (exists) {
    return res.status(400).json({
      message: "Room already booked for this date"
    });
  }

  // store booking
  bookings.push({ name, email, room, date });

  res.json({
    message: "Booking confirmed",
    booking: { name, room, date }
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});