//Paquetes
require('./config/config'); //configuration file
const express = require('express') //express package -> instalado previamente
const bodyParser = require('body-parser'); //body parser -> instalado previamente
const mongoose = require('mongoose'); //database -> instalado previamente

//definiciones
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//rutas generales del servidor
app.use(require('./routes/index'));


//database
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    (err, res) => {

        if (err)
            throw err;

        console.log('Base de datos ONLINE');

    });

//port
app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});