const mongoose = require('mongoose');

const reportOwner = mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner'
  },
  report: {
    type: String,
    require: true
  }
});

module.exports = Booking = mongoose.model('reportOwner', reportOwner);
