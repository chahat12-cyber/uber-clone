const captain = require('../models/captain_model');
const rideModel = require('../models/ride_model');
const mapService = require('../services/maps_service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { sendMessageToSocketId } = require('../socket/socket.io');



async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceAndTime(pickup, destination);

    const { distance, duration } = distanceTime;

    // Ensure distance and duration are valid strings
    if (!distance || !duration || typeof distance !== 'string' || typeof duration !== 'string') {
        throw new Error('Invalid distance or duration values from mapService');
    }

    // Parse numeric values from strings like "1.9 km" and "4 mins"
    const distanceKm = parseFloat(distance.replace(' km', '').replace(',', '').trim());
    const durationMin = parseFloat(duration.replace(' mins', '').replace(',', '').trim());

    if (isNaN(distanceKm) || isNaN(durationMin)) {
        throw new Error('Parsed distance or duration is NaN');
    }

    // Fare base rates
    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20,
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8,
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5,
    };

    // Fare calculation
    const fare = {
        auto: Math.round(baseFare.auto + (distanceKm * perKmRate.auto) + (durationMin * perMinuteRate.auto)),
        car: Math.round(baseFare.car + (distanceKm * perKmRate.car) + (durationMin * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + (distanceKm * perKmRate.moto) + (durationMin * perMinuteRate.moto)),
    };

    return fare;
}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);



    const ride = rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType]
    })

    return ride;
}


module.exports.confirmRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate(
        { _id: rideId },
        {
            status: 'accepted',
            captain: captain._id
        }
    );

    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')       // populate user info
        .populate('captain').select('+otp');   // populate captain info

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;
};



module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
};


module.exports.endRide = async ({ rideId,captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;

}