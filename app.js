const express = require('express')
var config = require('./config/config')

const app = express()

app.get('', (req, res) => {
    res.send('<h1>Hello Express !</h1>')
})

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
    console.log('Server running at port ' + port + ' : http://127.0.0.1:' + port)
})