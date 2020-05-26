const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cellPhone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

module.exports = Customer = mongoose.model('customer', CustomerSchema);
