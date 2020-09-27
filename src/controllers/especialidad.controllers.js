const { request, response } = require('express');
const Especialidad = require('../models/especialidad.model');



const getEspecialidad = async(req, res) => {

    const especialidad = await Especialidad.find()
        .populate('usuario', 'nombre1 apellido1 apellido2 email');
    res.json({
        ok: true,
        mesage: 'Todas las especialidades',
        especialidad
    });
};


const getEspecialidadBy = async(req, res) => {

    const id = req.params.id;
    const especialidad = await Especialidad.findById(id)
        .populate('usuario', 'nombre1 apellido1 apellido2 email');

    res.status(200).json({
        ok: true,
        message: 'Obteniendo una sola Especialidad',
        especialidad: especialidad
    });
};

const createEspecialidad = async(req = request, res = response) => {

    const { name } = req.body;
    try {
        const existeName = await Especialidad.findOne({ name: name });
        if (existeName) {
            return res.status(400).json({
                ok: false,
                message: 'El nombre de esta especialidad ya esta creado'
            });
        }
        const especialidad = new Especialidad(req.body);
        // console.log(especialidad);
        await especialidad.save();
        res.status(200).json({
            ok: true,
            message: 'Especialidad creada correctamente',
            especialidad: especialidad
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateEspecialidad = async(req, res) => {
    const especialidad = await Especialidad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ok: true, message: 'Especialidad actualizada correctamente', especialidad });
};

const deleteEspecialidad = async(req, res) => {
    // const especialidad = await Especialidad.findByIdAndDelete(req.params.id);
    const id = req.params.id;

    try {
        const especialidadDB = await Especialidad.findById(id);
        if (!especialidadDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe una especialidad con ese ID'
            });
        }
        await Especialidad.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Especialidad eliminada Correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error interno del sistema al eliminar la especialidad'
        });
    }
};

module.exports = {
    getEspecialidad,
    getEspecialidadBy,
    createEspecialidad,
    updateEspecialidad,
    deleteEspecialidad
}