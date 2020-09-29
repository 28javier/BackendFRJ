const { request, response } = require('express');
const DatosGeneralesUser = require('../models/datosGeneralesUser.model');




const getDatosGeneralesUserBy = async(req, res = response) => {
    try {

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario',

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const createDatosGeneralesUser = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario creado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateDatosGeneralesUser = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario modificado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteDatosGeneralesUser = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario elimado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

module.exports = {
    getDatosGeneralesUserBy,
    createDatosGeneralesUser,
    updateDatosGeneralesUser,
    deleteDatosGeneralesUser
};