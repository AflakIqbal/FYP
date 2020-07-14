const mongoose = require('mongoose');

const BookingSchema = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'vehicle',
  },
  days: {
    type: Number,
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,
  },
  comments: {
    type: String,
  },
  date: {
    type: Date,
    min: '1987-09-28',
    max: '2020-12-30',
    default: Date.now,
  },
  ownerFeedback: {
    rating: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
  cusomterFeedback: {
    rating: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
  vehicleFeedback: {
    rating: {
      type: Number,
    },
    feedback: {
      type: String,
    },
  },
});

module.exports = Booking = mongoose.model('booking', BookingSchema);
