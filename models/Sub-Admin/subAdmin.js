const mongoose = require('mongoose');

const subAdminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cellPhone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  officeLocation: {
    type: String,
    required: true,
  },
  photo: {
    data: Buffer,
    ContentType: String,
  },
  imageURI: {
    type: String,
  },
});

module.exports = subAdmin = mongoose.model('subAdmin', subAdminSchema);
