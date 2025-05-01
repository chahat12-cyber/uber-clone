const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controller/user_controller"); // ensure it exports a `register` function
const authMiddleware= require('../middleware/auth.middleware')
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("firstName")
    .isLength({ min: 3 })
    .withMessage("First name should be at least 3 characters"),
   body("password")
      .isLength({ min: 3 })
      .withMessage("Password should be at least 3 characters"),
  ],
  userController.registerUser // ✅ assumes you have a `register` function exported
);

router.post('/login', [
  body('email').isEmail().withMessage('Invalid email'),
  body('password').isLength({min:3})
.withMessage('Password must be 3 characters')],
userController.loginUser

);
router.get('/getUserProfile',authMiddleware.authUser, userController.getUserprofile)
router.get('/logout', authMiddleware.authUser, userController.logout)
module.exports = router;
