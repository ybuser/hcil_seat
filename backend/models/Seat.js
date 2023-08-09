const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seatNumber: String,
    reserved: Boolean
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;