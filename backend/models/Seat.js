const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  type: {
    type: String, // 'horizontal' or 'vertical'
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  },
  owner: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('Seat', seatSchema);