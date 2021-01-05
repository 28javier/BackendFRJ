const { Schema, model } = require('mongoose');


const DetalleVentaShema = Schema({

    idproducto: { type: Schema.Types.ObjectId, ref: 'Producto' },
    cantidad: Number,
    venta: { type: Schema.Types.ObjectId, ref: 'Venta' }
});


module.exports = model('DetalleVenta', DetalleVentaShema);