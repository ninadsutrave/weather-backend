import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';
import reversecode from './utils/reversecode.js';

//define paths for Express config
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up Express service
const app = express();
const port = process.env.PORT || 3000   

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    
    res.render('index', {
        title: "Midday",
        name: "Ninad Sutrave"
    });
})

app.get('/initial', (req, res) => {

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
            });
    
        })
    })

})

app.get('/about', (req, res) => {

    res.render('about', {
        title: "Midday",
        name: "Ninad Sutrave"
    })
})

app.get('/weather', (req, res) => {

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

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404!',
        name: 'Ninad Sutrave',
        errorMessage: 'The page you are looking for cannot be found! Click on Weather to reach the home page.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})