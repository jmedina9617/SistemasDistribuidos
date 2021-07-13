

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let rolesValidos = {
    values: ['ADMIN', 'USUARIO'],
    message: '{VALUE} no es un rol válido'
};

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        require: [true, 'Nombre es requerido']
    },
    direccion: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Correo es requerido']
    },
    password: {
        type: String,
        required: [true, 'Contraseña es obligatoria']
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        default: 'USUARIO',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    }
});

usuarioSchema.methods.toJSON = function(){
    
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
})

module.exports = mongoose.model('Usuario', usuarioSchema);