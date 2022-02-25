import request from 'request';

const forecast = (longitude, latitude, callback) => {

    console.log(latitude)
    const weatherUrl  = 'http://api.weatherstack.com/current?access_key=46aad7e912177691c9842ce56cb09f80&query=' + latitude + ',' + longitude

    request({ url: weatherUrl, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if(body.error) {
            callback('Unable to find location!', undefined);     
        }
        else {
            callback(undefined, {
                temp: body.current.temperature,
                precip: body.current.precip,
                descp: body.current.weather_descriptions,
                feelslike: body.current.feelslike,
                time: body.location.localtime,
                windSpeed: body.current.wind_speed
            });
        }
    })
}

export default forecast;