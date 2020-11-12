const { Schema, model } = require('mongoose');


const DatosGeneralesUserShema = Schema({



    cedula: { type: Number, required: true, uniqued: true },
    sexo: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
    fechaNacimiento: { type: Date },
    estadoCivil: { type: String, enum: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Unión-Libre', 'Separado/a', 'Comprometido/a'] },
    tipoDeSangre: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    direccion1: { type: String },
    direccion2: { type: String },
    celular1: { type: String },
    celular2: { type: String },

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', uniqued: true },
}, {
    timestamps: true,
    versionKey: false


});


module.exports = model('DatosGeneralesUser', DatosGeneralesUserShema);