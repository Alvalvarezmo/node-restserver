//Paquetes
const express = require('express'); //express package -> instalado previamente
const bcrypt = require('bcrypt'); //bcrypt package -> instalado previamente
const _ = require('underscore') //underscore package -> instalado previamente
const Ususario = require('../models/users'); //importamos el modelo de usuario
const { verificaToken, verificaAdmin_Role } = require('../middlewares/auth'); //importamos los middlewares

//definiciones
const app = express();


//rutas
app.get('/usuario', verificaToken, (req, res) => {

    return res.json({
        ususario: req.usuario,
    });


    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 3;
    limite = Number(limite);

    Ususario.find({ estado: true }, 'nombre email role estado google img') //encuentra usuarios con la condicion entre {} y devuelve solo los parametros entre '' de cada usuario
        .skip(desde) //salta los "desde" primeros registros
        .limit(limite) //solo quiero "limite" usuarios por pagina
        .exec((err, users) => {

            //error en los parametros
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //numero de usuarios en la base de datos
            Ususario.count({ estado: true }, (err, conteo) => {

                //usuarios encontrados
                res.json({
                    ok: true,
                    users,
                    quantity: conteo
                });

            });

        });

});

app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {

    //tomamos los datos del URI cando hacemos post
    let body = req.body;

    //definimos el objeto usuario
    let user = new Ususario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10), //10 es el numero de encryptaciones
        role: body.role
    });

    //guardamos el usuario en la base de datos
    user.save((err, usuarioDB) => {

        //error en los parametros
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //parametros enviados correctamente
        res.json({
            ok: true,
            user: usuarioDB
        });

    });

});

app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    //tomamos los datos del url
    let id = req.params.id;

    //permitimos la modificacion de los paramatros dentro del array -> ['nombre', 'email', 'img', 'role', 'estado']
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //actualizar base de datos
    Ususario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        //id no encontrado
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        //id encontrado y base de datos actualizada
        res.json({
            ok: true,
            user: usuarioDB
        });

    });

});

app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {

    //tomamos los datos del url
    let id = req.params.id;

    //modificacion del parametro 'estado'
    let cambiaEstado = {
        estado: false
    };

    //    Ususario.findByIdAndRemove(id, (err, usuarioBorrado) => {   /para eliminar completamente el usuario de la base de datos
    Ususario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => { //cambia el estado de un usuario a 'false'
        //id no encontrado
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        };

        //id encontrado y usuario borrado
        res.json({
            ok: true,
            user: usuarioBorrado
        });
    });



});

module.exports = app;