const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

geocode('New York', (error, response) => {
    console.log('Error', error)
    console.log('Response', response)
})

forecast(-75.7088, 44.1545, (error, response) => {
    console.log('Error', error)
    console.log('Response', response)
})