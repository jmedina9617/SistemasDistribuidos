
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongodb-autoincrement');
const timeZone = require('mongoose-timezone');

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    _id: {
        type: Number,
        //required: true
    },
    tipo: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    unidadMedida: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
},{
    timestamps: true,_id: false
});

/* servicioSchema.methods.toJSON = function(){
    
    let servicio = this;
    let servicioObject = servicio.toObject();

    delete servicioObject.password;

    return servicioObject;
} */

productoSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser único'
})

productoSchema.plugin(timeZone, { paths: ['date', 'subDocument.subDate'] });

productoSchema.plugin(autoIncrement.mongoosePlugin)

module.exports = mongoose.model('Producto', productoSchema);