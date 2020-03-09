const request = require('request')

const forecast = (data, callback) => {
    const forecastDataList = []
    data.forEach(function (item) {
        const url = 'https://api.darksky.net/forecast/c993f1bc363afead43bd569edc9f8794/' + item.latitude + ',' + item.longitude + "?units=si"
        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service !')
            } else if (body.error) {
                callback('Unable to find location. Try another search !')
            } else {
                const forecastData = {
                    'location': item.location,
                    'latitude': item.latitude,
                    'longitude': item.longitude,
                    'summary': body.currently.summary,
                    'icon': body.currently.icon,
                    'temperature': body.currently.temperature,
                    'precipProbability': body.currently.precipProbability
                };
                forecastDataList.push(forecastData)
            }
        })
    })
    setTimeout(function(){ callback(undefined, forecastDataList) }, 1500);
}

module.exports = forecast