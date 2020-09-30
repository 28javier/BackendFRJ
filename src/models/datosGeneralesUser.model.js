const { Schema, model } = require('mongoose');


const DatosGeneralesUserShema = Schema({



  cedula: { type: Number, required: true, uniqued: true },
    sexo: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true, },
    fechaNacimiento: { type: Date, required: true, },
    estadoCivil: { type: String, enum: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Unión-Libre', 'Separado/a', 'Comprometido/a'], required: true, },
    tipoDeSangre: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true, },
    direcciones: [{ type: String, required: true }],
    celulares: [{ type: String, required: true }],

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
    timestamps: true,
    versionKey: false


});


module.exports = model('DatosGeneralesUser', DatosGeneralesUserShema);