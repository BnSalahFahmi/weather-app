const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const address = process.argv[2]

if (address) {
    geocode(address, (error, response) => {
        if (error) {
            return console.log('Error occured during the connection to geocode service !')
        }
        forecast(response.latitude, response.longitude, (error, response) => {
            if (error) {
                return console.log('Error occured during the connection to weather service !')
            }
            console.log(response)
        })
    })
} else {
    console.log('Please provide an address !')
}