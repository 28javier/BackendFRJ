const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios.model');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, res) => {

    try {
        const usuarios = await Usuario.find()
            .populate('especialidad', 'name');
        res.json({
            ok: true,
            mesage: 'Todos los usuarios',
            usuarios: usuarios
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }

};

const getUsuarioBy = async(req, res) => {
    const id = req.params.id;
    try {
        const usuarioID = await Usuario.findById(id);
        if (!usuarioID) {
            res.status(400).json({
                ok: false,
                message: 'No existe una usuario con ese ID'
            });
        }
        const usuario = await Usuario.findById(id)
            .populate('especialidad', 'name');
        res.status(200).json({
            ok: true,
            message: 'Usuario por Id',
            usuario: usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};



const createUsuarios = async(req, res = response) => {

    const { nombre1, nombre2, apellido1, apellido2, password, email, especialidad } = req.body;


    try {
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                message: 'El email ya existe registrado'
            });
        }
        const usuario = new Usuario(req.body);
        // encriptar el password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // aqui se guarda el usuario
        await usuario.save();
        // generar el token
        const token = await generarJWT(usuario.id);
        res.status(200).json({
            ok: true,
            mesage: 'Usuario creado Correctamente',
            usuario: usuario,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateUsuario = async(req, res = response) => {
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }
        // actualizacion 
        const { password, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'Ya existe un usuario con ese Email'
                });
            }
        }
        campos.email = email;
        // atualizadar usuario 
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, { new: true });
        res.status(200).json({
            ok: true,
            message: 'Usuario actualizadao correctamente',
            usuario: usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado del sistema'
        });
    }
};

const deleteUsuario = async(req, res) => {
    const id = req.params.id;
    // const usuario = await Usuario.findByIdAndDelete(req.params.id);
    try {
        // se verifica si existe un usuario a eliminar
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }
        await Usuario.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Usuario eliminado Correctamente',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado del sistema al eliminar el usuario'
        });
    }
};


module.exports = {
    getUsuarios,
    getUsuarioBy,
    createUsuarios,
    updateUsuario,
    deleteUsuario
}