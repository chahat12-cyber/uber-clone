const mongoose = require('mongoose');

const blacklistedTokenSchema = mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  blacklistedAt: {
    type: Date,
    default: Date.now,
    expires: 86400, // 24 hours in seconds
  }
});

module.exports = mongoose.model('BlacklistedToken', blacklistedTokenSchema);
