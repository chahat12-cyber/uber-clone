const mongoose = require('mongoose');

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true, // recommended for modern drivers
    })
    .then(() => {
      console.log('✅ MongoDB connected successfully');
    })
    .catch((err) => {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1); // Exit process on failure
    });
}

module.exports = connectToDb;
