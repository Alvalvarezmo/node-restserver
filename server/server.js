//Paquetes
require('./config/config'); //configuration file
const express = require('express') //express package -> install required
const app = express()
const bodyParser = require('body-parser'); //body parser -> install required

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())


app.get('/usuario', function(req, res) {
    res.json('get usuario');
});

app.post('/usuario', function(req, res) {

    let body = req.body;
    res.json({
        persona: body
    });
});

app.put('/usuario/:id', function(req, res) {

    let id = req.params.id;
    res.json({
        id //id: id -> redundante y se puede poner solo con un id
    });
});

app.delete('/usuario', function(req, res) {
    res.json('delete usuario');
});


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});