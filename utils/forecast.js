const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/c993f1bc363afead43bd569edc9f8794/' + latitude + ',' + longitude
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service !')
        } else if (response.body.error) {
            callback('Unable to find location. Try another search !')
        } else {
            callback(undefined, response)
        }
    })
}

module.exports = forecast