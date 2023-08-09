const express = require('express');
const router = express.Router();
const Seat = require('../models/Seat');

router.get('/', async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.post('/reserve', async (req, res) => {
  const { seatNumber } = req.body;
  
  try {
    const seat = await Seat.findOne({ seatNumber });
    
    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }
    
    if (seat.reserved) {
      return res.status(400).json({ message: "Seat already reserved" });
    }
    
    seat.reserved = true;
    await seat.save();
    
    res.json({ message: "Seat reserved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
