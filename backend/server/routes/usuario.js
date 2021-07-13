
const express = require('express')
const app = express();

const bcrypt = require('bcrypt');
const underscore = require('underscore');

const Usuario = require('../models/usuario.js');
const { verificarToken, verificarAdminRol } = require('../middlewares/autenticacion.js');

//GET

app.get('/usuario', verificarToken ,(req, res) =>{

    /* let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite); */
    
    Usuario.find({ estado: true}, 'nombre email direccion fechaNacimiento tipo').exec( (err, usuarios) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Usuario.countDocuments({ estado: true}, (err, count) =>{

            res.json({
                ok: true,
                usuarios,
                cantidad: count
            });

        });

    })    
    
})

//GET BY ID

app.get('/usuario/:id', verificarToken ,(req, res) =>{

    let id = req.params.id;
    
    Usuario.findById(id, (err, usuario) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            usuario
        })

    })    
    
})

//POST

app.post('/usuario', [verificarToken, verificarAdminRol] , (req, res) =>{

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        direccion: body.direccion,
        telefono: body.telefono,
        fechaNacimiento: body.fechaNacimiento,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        tipo: body.tipo
    });

    usuario.save( (err, UsuarioDB) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //UsuarioDB.password = null;

        res.json({
            ok: true,
            usuario: UsuarioDB
        });

    })

})
  
//PUT

app.put('/usuario/:id', [verificarToken, verificarAdminRol], function (req, res) {

    let id = req.params.id;
    let body = underscore.pick(req.body, ['nombre','direccion','email','fechaNacimiento','tipo', 'password']);
    body = {
        password: bcrypt.hashSync(body.password, 10)
    };

    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, UsuarioDB) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            usuario: UsuarioDB
        })
        

    });

})

//DELETE

app.delete('/usuario/:id', [verificarToken, verificarAdminRol], function (req, res) {

    let id = req.params.id;

    //==========================
    //Borrado físico
    //==========================

    /* Usuario.findByIdAndRemove(id, (err, usuarioEliminado) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        })
        
    }); */

    /* let cambiaEstado = {
        estado = false
    } */

    //==========================
    //Borrado por estado
    //==========================

    Usuario.findByIdAndUpdate(id, {estado: false}, { new: true }, (err, usuarioEliminado) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!usuarioEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioEliminado
        })
        
    });
    
}) 

module.exports = app