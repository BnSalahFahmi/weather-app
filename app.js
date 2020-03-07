const geocode = require('./utils/geocode')

geocode('New York', (error, response) => {
    console.log('Error', error)
    console.log('Response', response)
})