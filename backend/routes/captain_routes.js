const express = require("express");
const router = express.Router();
const captainController = require("../controller/captain_controller");
const { body } = require("express-validator");
const captainMiddleware= require('../middleware/auth.middleware')
router.post(
  "/register",
  [
    // Full name validations
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),

    body("fullname.lastname")
      .optional()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),

    // Email validations
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),

    // Password validations
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

    // Vehicle details
    body("vehicle.color").notEmpty().withMessage("Vehicle color is required"),

    body("vehicle.numberPlate")
      .isLength({ min: 3 })
      .withMessage("Number plate must be at least 3 characters"),

    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Vehicle capacity must be at least 1"),

    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be car, motorcycle, or auto"),

    // Optional: location validations
    body("location.lat")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),

    body("location.long")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),
  ],
  captainController.registerCaptain
);

router.post(
  "/loginCaptain",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  captainController.loginCaptain
);
router.get('/captainProfile', captainMiddleware.authCaptain, captainController.getCaptainProfile)

router.get('/logoutCaptain', captainMiddleware.authCaptain, captainController.logoutCaptain)

module.exports = router;
