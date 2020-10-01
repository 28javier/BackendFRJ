const { Schema, model } = require('mongoose');



const ProductoSchema = Schema({


    nombreProducto: { type: String, required: true, unique: true },
    stockProducto: { type: Number, required: true },
    precioProducto: { type: Number, required: true, default: 0.00 },
    descripcionProducto: { type: String, required: true },

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true }
}, {
    timestamps: true,
    versionKey: false

});



module.exports = model('Producto', ProductoSchema);