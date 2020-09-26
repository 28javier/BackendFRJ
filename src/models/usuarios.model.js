const { Schema, Model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre1: {
        type: String,
        required: 'El primer nombre es requerido'
    },
    nombre2: {
        type: String,
        required: 'El segundo nombre es requerido'
    },
    apellido1: {
        type: String,
        required: 'El primer apellido es requerido'
    },
    apellido1: {
        type: String,
        required: 'El segundo apellido es requerido'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: 'Es password es requerido'
    },
    password: {
        type: String,
        required: 'El password es requerido'
    },
    img: {
        type: String,
    },

});