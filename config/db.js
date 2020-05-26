const mongoose = require('mongoose');
const config = require('config');

const connectDb = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    console.log('MongoDB Connected');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDb;
