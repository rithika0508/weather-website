const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ba91627c4a8248e431d8a4497bf4bf48&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)+'&units=f';

    request({url, json: true}, (error, {body}) => {  
        if (error) {
            callback('Cant connect!', undefined);
        } else if (body.error) {
            callback('Cant find the location, Enter right Location', undefined);
        } else {
            callback (undefined, body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+ ' fahreneit but it feels like '+ body.current.feelslike);
            console.log('test');
        }
    })
}

module.exports = forecast;
