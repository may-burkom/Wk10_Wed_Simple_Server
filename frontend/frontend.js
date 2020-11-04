const express = require('express')
const app = express()
const port = 8080
var path = require('path');

app.use(express.static('public'))
app.use(express.static('css'))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/homepage.html'));
});

app.listen(port, function() {
    console.log(`listening at http://localhost:${port}`)
})