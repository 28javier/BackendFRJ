const { Schema, model } = require('mongoose');


const EspecialidadShema = Schema({

    name: { type: String, required: true, unique: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
}, {
    timestamps: true,
    versionKey: false
});


module.exports = model('Especialidad', EspecialidadShema);