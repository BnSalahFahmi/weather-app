const path = require('path')
const express = require('express')
var config = require('./config/config')

const app = express()

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.status(200).sendFile('index.html');
})

const port = process.env.PORT || config.server.port;
app.listen(port, () => {
    console.log('Server running at port ' + port + ' : http://127.0.0.1:' + port)
})