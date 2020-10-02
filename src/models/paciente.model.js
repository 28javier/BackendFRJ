const { Schema, model } = require('mongoose');



const PacienteSchema = Schema({


    nombreP: { type: String, required: true },
    nombreP2: { type: String, required: true },
    apellidoP: { type: String, required: true },
    apellidoP2: { type: String, required: true },
    cedulaP: { type: Number, required: true, uniqued: true },
    sexoP: { type: String, enum: ['Masculino', 'Femenino', 'Otro'], required: true, },
    edadP: { type: Number, required: true },
    fechaNacimientoP: { type: Date, required: true, },
    estadoCivilP: { type: String, enum: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Unión-Libre', 'Separado/a', 'Comprometido/a'], required: true, },
    tipoDeSangreP: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'], required: true, },
    numeroDiscapacidadP: {
        type: String,
        enum: ['0%', '5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%',
            '55%', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%',
        ],
        required: true
    },
    direccionesP: [{ type: String, required: true }],
    celularesP: [{ type: String, required: true }],

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
    timestamps: true,
    versionKey: false

});


module.exports = model('Paciente', PacienteSchema);