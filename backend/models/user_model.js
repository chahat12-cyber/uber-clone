const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must be at least 3 characters"],
  },
  lastName: {
    type: String,
    minLength: [3, "Last name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    minLength: [3, "Email must be at least 3 characters"],
    match: [
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email',
    ],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
});

// 👇 use function to access `this`
userSchema.methods.generateAuthtoken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token will expire in 24 hours
  );
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 👇 FIX: use `statics` (not `static`)
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
