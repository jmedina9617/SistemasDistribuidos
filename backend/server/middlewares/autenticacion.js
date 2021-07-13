
const jwt = require('jsonwebtoken');

//================================
//Verificar Token
//================================

let verificarToken = ( req, res, next ) =>{

    let token = req.get('Authorization');

    jwt.verify( token, process.env.SEED_TOKEN, (err, decoded) =>{

        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            })
        }

        req.usuario = decoded.usuario;
        
        next();

    });

    
};

//================================
//Verificar Admin Rol
//================================

let verificarAdminRol = ( req, res, next ) =>{

    let usuario = req.usuario;

    if (usuario.tipo === 'ADMIN' ) {
        next();
    }else{
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario no es administrador'
            }
        })
    }
    
};

module.exports = {
    verificarToken,
    verificarAdminRol
};