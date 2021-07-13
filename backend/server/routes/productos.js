
const express = require('express')
const app = express();

const bcrypt = require('bcrypt');
const underscore = require('underscore');

const Producto = require('../models/productos');
const { verificarToken, verificarAdminRol } = require('../middlewares/autenticacion.js');

//GET

app.get('/productos', verificarToken ,(req, res) =>{

    /* let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite); */
    
    Producto.find({})
            .sort({_id: -1})
            .exec( (err, productos) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Producto.countDocuments({ /* estado: true */}, (err, count) =>{

            res.json({
                ok: true,
                productos,
                cantidad: count
            });

        });

    })    
    
})

//#region rest
/* 
app.get('/servicio', verificarToken ,(req, res) =>{

    let inicio = Number(req.query.desde);

    let hastaLimite = Number(req.query.hasta);
    
    Servicio.aggregate([{ $match: {fecha: inicio, fecha: hasta} }])
            .populate('conductor', 'nombre')
            .populate('tarifa', 'destino monto')
            .sort({_id: -1})
            .exec( (err, servicios) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        Servicio.countDocuments((err, count) =>{

            res.json({
                ok: true,
                servicios,
                cantidad: count
            });

        });

    })    
    
})
 
*/

//#endregion

//POST

app.post('/productos', [verificarToken, verificarAdminRol] , (req, res) =>{

    let body = req.body;

    // console.log(body);

    let producto = new Producto({
        tipo: body.tipo,
        nombre: body.nombre,
        unidadMedida: body.unidadMedida,
        cantidad: body.cantidad,
        precio: body.precio
    });

    //console.log(body);return;

    producto.save( (err, ProductoDB) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        //UsuarioDB.password = null;

        res.json({
            ok: true,
            producto: ProductoDB
        });

    })

})
  
//PUT

app.put('/producto/:id', [verificarToken, verificarAdminRol], function (req, res) {

    let id = req.params.id;
    let body = underscore.pick(req.body, ['tipo','nombre','unidadMedida','cantidad','precio']);

    Producto.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, ProductoDB) =>{

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        
        res.json({
            ok: true,
            producto: ProductoDB
        })
        

    });

})

//DELETE

app.delete('/producto/:id', [verificarToken, verificarAdminRol], function (req, res) {

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
    //Borrado lógico
    //==========================

    Producto.findByIdAndUpdate(id, {estado: false}, { new: true }, (err, productoEliminado) =>{
        
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoEliminado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            producto: productoEliminado
        })
        
    });
    
}) 

module.exports = app