const express = require('express');
const router = express.Router();
const MapController = require('../controller/maps_controller');
const userMiddleware= require('../middleware/auth.middleware')
const {query} = require('express-validator');


router.get('/get-coordinates',
    query('address').isString().isLength({ min: 1 }).withMessage('Address is required'),
    userMiddleware.authUser, 
     MapController.getAddressCoordinate);


     router.get('/get-distance-time',
query('origin').isString().isLength({ min: 1 }).withMessage('Origin is required'),
query('destination').isString().isLength({ min: 1 }).withMessage('Destination is required'),
userMiddleware.authUser,
MapController.getDistanceAndTime

     );

     router.get('/get-suggestions',
query('input').isString().isLength({ min: 1 }).withMessage('Input is required'),
userMiddleware.authUser,
MapController.getSuggestions
);

module.exports = router;