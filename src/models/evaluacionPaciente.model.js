const { Schema, model } = require('mongoose');



const evaluacionPacienteSchema = Schema({

    motivoConsulta: { type: String, required: false, unique: false },
    tratamiento: { type: String, required: false, unique: false },
    evolucion: { type: String, required: false, unique: false },
    fechaEvolucion: { type: Date, default: Date.now },

    paciente: { type: Schema.Types.ObjectId, ref: 'Paciente', required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
    timestamps: true,
    versionKey: false

});




module.exports = model('EvaluacionPaciente', evaluacionPacienteSchema);