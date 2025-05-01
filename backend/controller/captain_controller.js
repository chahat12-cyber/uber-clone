const captainModel = require("../models/captain_model");
const captainService = require("../services/captain_service");
const backListToken= require('../models/backlistToken_model');

const { validationResult } = require("express-validator");

const CaptainController = {
  registerCaptain: async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
console.log(req.body);
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
      res.status(400).json({ message: "Captain Already Exist" });
    }
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await captainService.createCaptain({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email: email,
      password: hashedPassword,
      color: vehicle.color,
      capacity: vehicle.capacity,
      numberPlate: vehicle.numberPlate, // ✅ THIS WAS MISSING
      vehicleType: vehicle.vehicleType,
    });
    

    const token = captain.generateAuthToken();
    res.status(200).json({ token, captain });
  },

  loginCaptain: async(req , res , next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty){
      res.status(400).json({errors: errors.array()})
    }
    const {email, password}= req.body;

    const captain= await captainModel.findOne({email}).select('password');

    if(!captain){
      res.status(401).json({message: 'Invalid Email or Password'});
    }

    const isPasswordMatched= await captain.comparePassword(password);

    if(!isPasswordMatched){
      res.status(401).json({message: 'Invalid Email or Password'}); 
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    return res.status(201).json({ token, captain });
  },

  getCaptainProfile: async(req, res, next)=> {
    return res.status(200).json({captain: req.captain});
  },

  logoutCaptain: async (req, res, next)=> {
     // Get token first (before clearing cookie)
        const token =
          (req.cookies && req.cookies.token) ||
          (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    
        // Optional: blacklist token (if using a blacklist system)
        if (token) {
          await backListToken.create({ token }); // if you use blacklist
        }
    
        // Clear the cookie
        res.clearCookie("token");
    
        return res.status(200).json({ message: "Logged out successfully" });
      
  }
  
};

module.exports = CaptainController;
