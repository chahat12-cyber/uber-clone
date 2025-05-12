const { Server } = require("socket.io");
const userModel = require("../models/user_model");
const captainModel = require("../models/captain_model");

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*", // Allow all origins, update this for production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        console.log(`New client connected: ${socket.id}`);

        socket.on("join", async (data) => {

            const { userId, userType } = data;
              console.log(`Joined as ${userId} and ${userType} `)
            if (userType === "user") {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === "captain") {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }

        });

        socket.on('update-location-captain', async (data) => {
        const {userId, location}    = data;
        console.log(`current location ${location.lat}`)
        if(!location || !location.lat || !location.lng) {
            return socket.emit("error", "Invalid location data");
        }
        await captainModel.findByIdAndUpdate(userId, { location: {
            lat: location.lat,
            long: location.lng,
        } });
        });

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit( messageObject.event, messageObject.data);
    } else {
        console.error("Socket.io is not initialized");
    }
};

module.exports = {
    initializeSocket,
    sendMessageToSocketId,
};