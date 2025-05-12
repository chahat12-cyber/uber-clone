const dotenv= require('dotenv')
dotenv.config();
const cors= require('cors')
const cookie= require('cookie-parser');
const express= require('express');
const connectToDb= require('./db/db');
const userRouter= require('./routes/user_route');
const captainRouter= require('./routes/captain_routes')
const mapRouter= require('./routes/maps_routes')
const rideRoutes= require('./routes/ride_routes');
const app= express();

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookie());

app.get('/', (req,res)=> {

    res.send('console')
})
app.use('/users', userRouter);
app.use('/captain', captainRouter);
app.use('/maps', mapRouter);
app.use('/rides', rideRoutes);

module.exports = app;