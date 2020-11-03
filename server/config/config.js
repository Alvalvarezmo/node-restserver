// ************************** //
// Puerto                     //
// ************************** //
process.env.PORT = process.env.PORT || 3000;

// ************************** //
// Entorno                    //
// ************************** //
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ************************** //
// Base de datos              //
// ************************** //
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI; //MONGO_URI es una variable the entorno que se ha creado en Heroku para ocultar el usuario y el password en gitHub
};

process.env.URLDB = urlDB;