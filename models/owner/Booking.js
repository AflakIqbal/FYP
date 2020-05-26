const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner'
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicle'
  },
  days: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  ownerFeedback: {
    rating: {
      type: Number
    },
    feedback: {
      type: String
    }
  },
  cusomterFeedback: {
    rating: {
      type: Number
    },
    feedback: {
      type: String
    }
  }
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
