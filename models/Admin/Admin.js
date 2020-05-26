const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
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
  },
  officeLocation: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

module.exports = Admin = mongoose.model('Admin', AdminSchema);
