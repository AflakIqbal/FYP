const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner'
  },
  available: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  seatingCapacity: {
    type: Number,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  fare: {
    type: Number,
    required: true
  }
});

module.exports = Vehicle = mongoose.model('vehicle', VehicleSchema);
