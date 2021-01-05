const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre1: { type: String, required: true },
    nombre2: { type: String, required: true },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['Secrt_Role', 'Admin_Role', 'Medic_Role'], default: 'Secrt_Role' },
    password: { type: String },
    img: { type: String },
    especialidad: { type: Schema.Types.ObjectId, ref: 'Especialidad', required: true },
    cedula: { type: Number, required: true, uniqued: true },
    sexo: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
    fechaNacimiento: { type: Date },
    estadoCivil: { type: String, enum: ['Soltero/a', 'Casado/a', 'Viudo/a', 'Unión-Libre', 'Separado/a', 'Comprometido/a'] },
    tipoDeSangre: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    direccion1: { type: String },
    direccion2: { type: String },
    celular1: { type: String },
    celular2: { type: String },
}, {
    timestamps: true,
    versionKey: false

});

UsuarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    // password,
    return object;
});

module.exports = model('Usuario', UsuarioSchema);