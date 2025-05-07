const usermodel= require('../models/user_model');
const captainModel = require('../models/captain_model');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const backlistTokenModel = require('../models/backlistToken_model');


module.exports.authUser = async (req, res, next) => {
   const token =
     (req.cookies && req.cookies.token) ||
     (req.headers.authorization && req.headers.authorization.split(' ')[1]);
 
   if (!token) {
     return res.status(401).json({ message: 'Unauthorized user!' });
   }
 
   // ✅ Await the result of blacklist check
   const isBlacklisted = await backlistTokenModel.findOne({ token: token });
 
   if (isBlacklisted) {
     return res.status(401).json({ message: 'Token has been blacklisted' });
   }
 
   try {
     const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
     const user = await usermodel.findById(decodedToken._id);
     req.user = user;
     return next();
   } catch (error) {
     return res.status(401).json({ message: 'Unauthorized' });
   }
 };


 module.exports.authCaptain = async (req, res, next) => {
  const token =
    (req.cookies && req.cookies.token) ||
    (req.headers.authorization && req.headers.authorization.split(' ')[1]);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }

  // ✅ Await the result of blacklist check
  const isBlacklisted = await backlistTokenModel.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: 'Token has been blacklisted' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const captain = await captainModel.findById(decodedToken._id);
    req.captain = captain;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
 