// const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuarios.model');
const { generarJWT } = require('../helpers/jwt');



const getUsuarios = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    try {
        // const usuarios = await Usuario.find()
        //     .populate('especialidad', 'name')
        //     .skip(desde).limit(5);
        // const totalUsuario = await Usuario.count();
        const [usuarios, totalUsuario] = await Promise.all([
            Usuario.find()
            .populate('especialidad', 'name')
            .skip(desde).limit(5),
            Usuario.countDocuments()
        ]);
        res.json({
            ok: true,
            message: 'Todos los usuarios',
            usuarios: usuarios,
            totalUsuario: totalUsuario
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
            return res.status(400).json({
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



const createUsuarios = async(req, res) => {

    const { nombre1, nombre2, apellido1, apellido2, password, email, especialidad, cedula } = req.body;


    try {
        const existeCedula = await Usuario.findOne({ cedula: cedula });
        const existeEmail = await Usuario.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                message: 'El email ya existe registrado'
            });
        } else if (existeCedula) {
            return res.status(400).json({
                ok: false,
                message: 'La cedula ya esta registrada'
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
            message: 'Usuario creado Correctamente',
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

const updateUsuario = async(req, res) => {
    const id = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                message: 'No existe un usuario con ese ID'
            });
        }
        // actualizacion 
        const { password, email, cedula, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    message: 'Ya existe un usuario con ese Email'
                });
            }
        }
        if (usuarioDB.cedula !== cedula) {
            const existeCedula = await Usuario.findOne({ cedula: cedula });
            if (existeCedula) {
                return res.status(400).json({
                    ok: false,
                    message: 'Ya existe un usuario con esta cedula'
                });
            }
        }
        campos.email = email;
        campos.cedula = cedula;
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
    try {
        // se verifica si existe un usuario a eliminar
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            return res.status(400).json({
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
};