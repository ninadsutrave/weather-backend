import request from 'request';

const reversecode = (latitude, longitude, callback) => { 

    const mapsUrl  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+longitude+','+latitude+'.json?access_token=pk.eyJ1IjoibmluYWRzdXRyYXZlIiwiYSI6ImNreW5ka3ByNzJoMWoydnAwMzZubWx4dnkifQ.uyvjS6kYAXb-2zCEPjUWWw';

    request({ url: mapsUrl, json: true }, (error, {body}) => {
        if(error) {
            callback('Unable to connect to location services!', undefined);
        } 
        else if(!body.features.length) {
            callback('Unable to find location. Try another search.', undefined);
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name
            });
        }
    })

}

export default reversecode;