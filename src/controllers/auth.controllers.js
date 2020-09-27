const { response } = require('express');
const { generarJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios.model');


const login = async(req, res = response) => {

    const { email, password } = req.body;
    try {
        const usuarioDB = await Usuario.findOne({ email: email });
        // verificar email
        if (!usuarioDB) {
            res.status(400).json({
                ok: false,
                message: 'Email o Password Incorretos !!!!'
            });
        }
        // verificar password
        const validarPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Password o Email Incorretos !!!!'
            });
        }
        // generar el token
        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            message: 'Logueado correctamente',
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'No se pudo logear Error del servidor'
        });
    }
};

module.exports = {
    login
}