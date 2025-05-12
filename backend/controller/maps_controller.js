const { get } = require('mongoose');
const maps=require('../services/maps_service');
const { validationResult } = require('express-validator');

const MapController= {

getAddressCoordinate: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

         const coordinates = await maps.getAddressCoordinate(req.query.address);
        if (!coordinates) {
            return res.status(404).json({ error: 'Coordinates not found' });
        }
        res.status(200).json(coordinates);


         } catch (error) {
        console.error('Error fetching coordinates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},
getDistanceAndTime: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;
        const distanceAndTime = await maps.getDistanceAndTime(origin, destination);
        if (!distanceAndTime) {
            return res.status(404).json({ error: 'Distance and time not found' });
        }
        res.status(200).json(distanceAndTime);

    } catch (error) {
        console.error('Error fetching distance and time:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
},

getSuggestions: async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;
        const suggestions = await maps.getSuggestions(input);
        if (!suggestions) {
            return res.status(404).json({ error: 'Suggestions not found' });
        }
        res.status(200).json(suggestions);

    } catch (error) {
        console.error('Error fetching suggestions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
}

module.exports = MapController;