const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const RideController = require('../controller/ride_controller');
const userAuth = require('../middleware/auth.middleware')
router.post('/create-ride',
    body('pickup').isString().isLength({ min: 1 }).withMessage('Pickup location is required'),
    body('destination').isString().isLength({ min: 1 }).withMessage('Dropoff location is required'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Vehicle type is required'),
    userAuth.authUser,
    RideController.createRide

);


router.get('/get-fare',
    query('pickup').isString().isLength({ min: 1 }).withMessage('Pickup location is required'),
    query('destination').isString().isLength({ min: 1 }).withMessage('Dropoff location is required'),
    userAuth.authUser,
    RideController.getFare
);


module.exports = router;