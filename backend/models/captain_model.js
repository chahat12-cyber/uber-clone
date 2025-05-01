const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const captainModel = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be at least 3 characters"],
    },
},
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
      select: true,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    vehicle: {
      color: {
        type: String,
        required: true,
      },
      numberPlate: {
        type: String,
        required: true,
        minlength: [3, "Number Plate must be at least 3 numbers"],
      },
      capacity: {
        type: Number,
        required: true,
        minlength: [1, "Capacity must be at least 1"],
      },
      vehicleType: {
        type: String,
        required: true,
        enum: ["car", "motorcycle", "auto"],
      },
    
  },
  location: {
    lat: {
        type: Number,

    },
    long: {
        type: Number
    }
  }
});

captainModel.methods.generateAuthToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' } // Token will expire in 24 hours
  );
};

captainModel.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// 👇 FIX: use `statics` (not `static`)
captainModel.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};


const captain= mongoose.model('captain', captainModel)

module.exports= captain;