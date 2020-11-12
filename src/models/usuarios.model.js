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