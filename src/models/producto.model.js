const { Schema, model } = require('mongoose');



const ProductoSchema = Schema({


    codigoProducto: { type: String, required: true, unique: true },
    nombreProducto: { type: String, required: true, unique: false },
    stockProducto: { type: Number, required: true, unique: false },
    precioProducto: { type: Number, required: true, default: 0.00 },
    descripcionProducto: { type: String, required: true, unique: false },
    img: { type: String },


    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true }
}, {
    timestamps: true,
    versionKey: false

});



module.exports = model('Producto', ProductoSchema);