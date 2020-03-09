const path = require('path')
const express = require('express')
const hbs = require('hbs')
var config = require('./config/config')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

/*** Define paths for Express config ***/
const publicDirPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialsPath = path.join(__dirname, 'templates/partials')

/*** Setup handlebars engine ***/
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

/*** Setup static directory to serve ***/
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { data }) => {
        if (error) {
            return res.send({ error })
        }
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                title: 'Weather App',
                data: forecastData
            })
        })
    })
})

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
    console.log('Server running at port ' + port + ' : http://127.0.0.1:' + port)
})