import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

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

app.get('/about', (req, res) => {
    res.render('about', {
        title: "Midday",
        name: "Ninad Sutrave"
    })
})

// app.get('/help', (req, res) => {
//     res.render('help', {
//         title: "Help",
//         name: "Ninad Sutrave"
//     })
// })

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

// app.get('/products', (req, res) => {

//     if(!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query);
//     res.send({
//         products: []
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Ninad Sutrave',
//         errorMessage: 'Page not found!'
//     })
    
// })

app.get('*', (req, res) => {
    
    res.render('404', {
        title: '404',
        name: 'Ninad Sutrave',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000');
})