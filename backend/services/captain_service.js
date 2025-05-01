const captainModel = require('../models/captain_model');

module.exports.createCaptain = async ({
  firstname,
  lastname,
  email,
  password,
  color,
  capacity,
  numberPlate,
  vehicleType,
}) => {
  // Manual validation
  if (!firstname || firstname.length < 3) {
    throw new Error('Firstname is required and must be at least 3 characters');
  }
  if (!email) {
    throw new Error('Email is required');
  }
  if (!password || password.length < 6) {
    throw new Error('Password must be at least 6 characters long');
  }
  if (!color || !capacity || !numberPlate || !vehicleType) {
    throw new Error('All vehicle details are required');
  }

  console.log(`color: ${color}`)
  console.log(`capacity: ${capacity}`)
  console.log(`number plate: ${numberPlate}`)
  console.log(`vehicle type: ${vehicleType}`)

  
  // Create captain
  // In the service
const newCaptain = await captainModel.create({
  fullname: { firstname, lastname },
  email,
  password, // ✅ now matches hashed input
  vehicle: {
    color,
    capacity,
    numberPlate,
    vehicleType,
  },
});


return newCaptain;

  // Generate token
 
};
