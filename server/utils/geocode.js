const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZmFobWliZW5zYWxhaCIsImEiOiJjazdmdXEyYWowNmExM2xuNjBvcmhtdjBzIn0.s7up0rOvQOkseyXr9lbRTw'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to geocode service !')
        } else if (body.error) {
            callback('Unable to find location. Try another search !')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode