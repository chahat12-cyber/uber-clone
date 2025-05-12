const axios = require('axios');
const captainModel = require('../models/captain_model');
const haversine = require('haversine-distance');
module.exports.getAddressCoordinate = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(`Geocoding API error: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw error;
  }
};


module.exports.getDistanceAndTime = async (origin, destination) => {  
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    const response = await axios.get(url);
    
    if (response.data.status === 'OK') {
      const element = response.data.rows[0].elements[0];
      return {
        distance: element.distance.text,
        duration: element.duration.text,
      };
    } else {
      throw new Error(`Distance Matrix API error: ${response.data.status}`);
    }
  } catch (error) {        
    console.error('Error fetching distance and time:', error.message);
    throw error;
  }
}

module.exports.getSuggestions = async (input) => {
  try {
    const apiKey = process.env.GOOGLE_API_KEY; // Replace with your actual API key
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
    const response = await axios.get(url);
    if (response.data.status === 'OK') {
      return response.data.predictions.map(prediction => ({
        description: prediction.description,
        place_id: prediction.place_id,
      }));
    } else {
      throw new Error(`Autocomplete API error: ${response.data.status}`);
    }
  }
  catch (error) {
    console.error('Error fetching suggestions:', error.message);
    throw error;
  }
}


module.exports.getCaptainsInTheRadius = async (lat, lng, radiusKm) => {
  const allCaptains = await captainModel.find({});

  const captainsInRadius = allCaptains.filter(captain => {
    const captainLat = captain.location?.lat;
    const captainLong = captain.location?.long;

    if (captainLat == null || captainLong == null) return false;

    const pickup = { lat: lat, lon: lng };
    const captainLoc = { lat: captainLat, lon: captainLong };

    const distance = haversine(pickup, captainLoc) / 1000; // meters → km
    return distance <= radiusKm;
  });

  return captainsInRadius;
};