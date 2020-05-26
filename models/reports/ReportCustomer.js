const mongoose = require('mongoose');

const reportCustomer = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner'
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer'
  },
  report: {
    type: String,
    require: true
  }
});

module.exports = ReportCustomer = mongoose.model(
  'reportCustomer',
  reportCustomer
);
