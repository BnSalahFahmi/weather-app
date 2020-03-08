const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c993f1bc363afead43bd569edc9f8794/' + latitude + ',' + longitude
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service !')
        } else if (body.error) {
            callback('Unable to find location. Try another search !')
        } else {
            const forecastData = 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + '% chance of rain'
            callback(undefined, forecastData)
        }
    })
}

module.exports = forecast