const { validationResult } = require("express-validator");
const userModel = require("../models/user_model");
const { createUser } = require("../services/user_service");
const blacklistedToken = require("../models/backlistToken_model");
const User = {
  registerUser: async (req, res, next) => {
    const errors = validationResult(req); // ✅ Fix 1: Use () after `isEmpty`

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email });
    if (isUserAlreadyExist) {
      res.status(400).json({ message: "User Already Exist" });
    }
    // ✅ Fix 2: Make sure hashpassword is a static method or utility
    const hashPassword = await userModel.hashPassword(password);

    const user = await createUser({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    // ✅ Fix 3: Generate token from the created user
    const token = user.generateAuthtoken(); // assuming it's an instance method

    console.log(`token is ${token}`);
    res.status(201).json({ token, user });
  },
  loginUser: async (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("password");
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const isMatched = user.comparePassword(password);
    if (!isMatched) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }
    const token = user.generateAuthtoken();
    res.cookie("token", token);
    return res.status(201).json({ token, user });
  },
  getUserprofile: async (req, res, next) => {
    res.status(200).json(req.user);
  },
  logout: async (req, res, next) => {
    // Get token first (before clearing cookie)
    const token =
      (req.cookies && req.cookies.token) ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    // Optional: blacklist token (if using a blacklist system)
    if (token) {
      await blacklistedToken.create({ token }); // if you use blacklist
    }

    // Clear the cookie
    res.clearCookie("token");

    return res.status(200).json({ message: "Logged out successfully" });
  },
};

module.exports = User;
