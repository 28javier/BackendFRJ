const { Schema, model } = require('mongoose');



const CategoriaSchema = Schema({

nombreCategoria: { type: String, required: true, unique: true },
    descripcionCategoria: { type: String, required: true },

    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
    timestamps: true,
    versionKey: false

});




module.exports = model('Categoria', CategoriaSchema);