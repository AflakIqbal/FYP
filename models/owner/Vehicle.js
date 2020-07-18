const mongoose = require('mongoose');

const VehicleSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
  },
  city: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  driver: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  imageURI: {
    type: String,
  },
});

module.exports = Vehicle = mongoose.model('vehicle', VehicleSchema);
