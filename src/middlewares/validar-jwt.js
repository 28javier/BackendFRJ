const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.model');


const validarJWT = (req, res = response, next) => {

    //LEER EL TOKEN    
    const token = req.header('x-token');

    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la Petición'
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRT);
        req.id = id;
        next();
        // console.log(id);

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no Válido'
        });
    }
};

const validarAdmin_Role = async(req, res, next) => {

    const id = req.id;
    try {
        const usuarioDB = await Usuario.findById(id);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }
        // || (usuarioDB.role !== 'Secrt_Role')
        if (usuarioDB.role !== 'Admin_Role') {
            return res.status(403).json({
                ok: false,
                message: 'No tienes privilegios para hacer eso'
            });
        }

        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Hable con el Administrador'
        });
    }
}



module.exports = {
    validarJWT,
    validarAdmin_Role
}