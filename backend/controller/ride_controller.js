const rideModel = require('../models/ride_model');
const rideService = require('../services/ride_service');
const { validationResult } = require('express-validator');
const mapService= require('../services/maps_service');
const {sendMessageToSocketId} = require('../socket/socket.io');
const RideController= {

    createRide: async (req, res) => {
 const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
     }

     const { pickup, destination, vehicleType } = req.body;


   
     try {
         const ride = await rideService.createRide({ user: req.user._id, pickup, destination, vehicleType });
        

         
         res.status(201).json(ride);
              //  nearby captain

              const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
                 console.log("pickupCoordinates", pickupCoordinates);
              const captainsInRadius= await mapService.getCaptainsInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 2);
               ride.otp= "";
              captainsInRadius.map(async (captain) => {
                  sendMessageToSocketId(captain.socketId,  {
                    event: "new-ride",
                    data: ride
                    
               })});

              console.log("captainsInRadius", captainsInRadius);
 

     } catch (err) {

         console.log(err);
         return res.status(500).json({ message: err.message });
     }

    },

    getFare: async (req, res) => {
       const errors = validationResult(req);
           if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
           }

           const { pickup, destination } = req.query;

           try {
               const fare = await rideService.getFare(pickup, destination);
               return res.status(200).json(fare);
           } catch (err) {
               return res.status(500).json({ message: err.message });
           }
    }
}



module.exports = RideController