import express from 'express';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';
import reversecode from './utils/reversecode.js';
import cors from 'cors';

//set up Express service
const app = express();
const port = process.env.PORT || 5000   

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/coordinates', (req, res) => {

    if(!req.query.lat || !req.query.long) {
        return res.send({
            error: 'Coordinates not found'
        })
    }
    reversecode(req.query.lat, req.query.long, (error, { location } = {}) => {

        if(error) {
            //another way of writing {error:error}
            return res.send({ error })
        }

        forecast(req.query.long, req.query.lat, (error, forecastData) => {

            if(error) {
                return res.send({ error })
            }

            res.send({
                temp: forecastData.temp, 
                precip: forecastData.precip,
                descp: forecastData.descp,
                feelslike: forecastData.feelslike,
                time: forecastData.time,
                windSpeed: forecastData.windSpeed,
                location,
                isDay: forecastData.isDay,
                humidity: forecastData.humidity
            });
    
        })
    })

})

app.get('/location', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

        if(error) {
            //another way of writing {error:error}
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error) {
                return res.send({ error })
            }

            res.send({
                temp: forecastData.temp, 
                precip: forecastData.precip,
                descp: forecastData.descp,
                feelslike: forecastData.feelslike,
                time: forecastData.time,
                windSpeed: forecastData.windSpeed,
                location,
                address: req.query.address
            });
    
        })
    })

})

app.listen(port, () => {
    console.log('Server is up on port 5000');
})