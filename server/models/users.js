//Paquetes
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//Esquema de mongoDB
let Schema = mongoose.Schema;


//roles validos por el usuario
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


//Definicion del esquema de usuario
let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true, //para que el correo sea unico en la base de datos
        required: [true, 'El correo es necessario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


//no devolver el apartado de password
usuarioSchema.methods.toJSON = function() {

    //creamos un nuevo objeto usuario que sera igual al objeto usuario inicial
    let user = this;
    let userObject = user.toObject();

    //eliminamos el campo de password
    delete userObject.password;

    //devolvemos el nuevo usuario sin password
    return userObject;

};


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' })


module.exports = mongoose.model('Usuario', usuarioSchema);