const { request, response } = require('express');
const DatosGeneralesUser = require('../models/datosGeneralesUser.model');





const getDatosGeneralesUserBy = async(req, res = response) => {

    const id = req.params.id;
    try {

        const datosGeneralesDB = await DatosGeneralesUser.findById(id);
        if (!datosGeneralesDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe los datos generales de este usuario'
            });
        }
        const datosGenerales = await DatosGeneralesUser.findById(id)
            .populate('usuario', 'nombre1 apellido1 apellido2 email');
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario',
            datosGenerales

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

    // const id = req.id;
    const { cedula, sexo, fechaNacimiento, estadoCivil, tipoDeSangre, direcciones, celulares } = req.body;
    try {
        const existeCedula = await DatosGeneralesUser.findOne({ cedula: cedula });
        if (existeCedula) {
            return res.status(400).json({
                ok: false,
                message: 'No se puede registrar los datos por que la cedula ya esta en uso',
            });
        }
        const datosGenerales = new DatosGeneralesUser({...req.body });
        const datosGeneralesDB = await datosGenerales.save();
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Usuario creado',
            datosGeneralesDB: datosGeneralesDB
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


    const idE = req.params.id;
    // const id = req.id; //id del usaurio que modifica la especialidad
    try {
        const datosGenerales = await DatosGeneralesUser.findById(idE);
        if (!datosGenerales) {
            res.status(404).json({
                ok: false,
                message: 'No se encontro los datos personales por el Id'
            });
        }
        const cambioDatosGenerales = {...req.body };
        const datosGeneralesDB = await DatosGeneralesUser.findByIdAndUpdate(idE, cambioDatosGenerales, { new: true });
        res.status(200).json({
            ok: true,
            message: 'Especialidad actualizada correctamente',
            datosGenerales: datosGeneralesDB
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

    const id = req.params.id;

    try {
        const datosGeneralesDB = await DatosGeneralesUser.findById(id);
        if (!datosGeneralesDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe una especialidad con ese ID'
            });
        }
        await DatosGeneralesUser.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Datos generales eliminada Correctamente'
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