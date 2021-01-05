const { Schema, model } = require('mongoose');


const VentaShema = Schema({

    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente' },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    fecha: { type: Date, default: Date.now }
});


module.exports = model('Venta', VentaShema);