const { response } = require('express');
const DetalleVenta = require('../models/detalleVenta.model');

const getDetalleVenta = async(req, res) => {
    // try {
    //     const especialidad = await Especialidad.find()
    //         .populate('usuario', 'nombre1 apellido1 email');
    //     res.status(200).json({
    //         ok: true,
    //         mesage: 'Todas las especialidades',
    //         especialidad: especialidad
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }
};

const getDetalleVentaPa = async(req, res) => {
    // const desde = Number(req.query.desde) || 0;

    // try {
    //     const [especialidad, totalEspecialidad] = await Promise.all([
    //         Especialidad.find()
    //         .populate('usuario', 'nombre1 apellido1 email')
    //         .skip(desde).limit(5),
    //         Especialidad.countDocuments()
    //     ]);
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Todas las especialidades',
    //         especialidad: especialidad,
    //         totalEspecialidad: totalEspecialidad
    //     });

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }
};

const getDetalleVentaBy = async(req, res) => {

    // const id = req.params.id;
    // try {
    //     const especialidadDB = await Especialidad.findById(id);
    //     if (!especialidadDB) {
    //         res.status(400).json({
    //             ok: false,
    //             message: 'No existe una especialidad con ese ID'
    //         });
    //     }
    //     const especialidad = await Especialidad.findById(id)
    //         .populate('usuario', 'nombre1 apellido1 apellido2 email');

    //     res.status(200).json({
    //         ok: true,
    //         message: 'Obteniendo una sola Especialidad',
    //         especialidad: especialidad
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }

};

const createDetalleVenta = async(req, res) => {

    // const id = req.id; //id del usuario
    // const { name } = req.body;
    // console.log(id);
    // try {
    //     const existeName = await Especialidad.findOne({ name: name });
    //     if (existeName) {
    //         return res.status(400).json({
    //             ok: false,
    //             message: 'El nombre de esta especialidad ya esta creado'
    //         });
    //     }
    //     const especialidad = new Especialidad({ usuario: id, ...req.body });
    //     // console.log(especialidad);
    //     const especialidadDB = await especialidad.save();
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Especialidad creada correctamente',
    //         especialidad: especialidadDB
    //     });

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }
};

const updateDetalleVenta = async(req, res) => {

    // const idE = req.params.id;
    // const id = req.id; //id del usaurio que modifica la especialidad
    // try {
    //     const especialidad = await Especialidad.findById(idE);
    //     if (!especialidad) {
    //         res.status(404).json({
    //             ok: false,
    //             message: 'No se encontro la especialidad por el Id'
    //         });
    //     }
    //     const cambioEspecialidad = {...req.body, usuario: id }
    //     const especialidadActualizada = await Especialidad.findByIdAndUpdate(idE, cambioEspecialidad, { new: true });
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Especialidad actualizada correctamente',
    //         especialidad: especialidadActualizada
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }

};

const deleteDetalleVenta = async(req, res) => {
    // const especialidad = await Especialidad.findByIdAndDelete(req.params.id);
    // const id = req.params.id;

    // try {
    //     const especialidadDB = await Especialidad.findById(id);
    //     if (!especialidadDB) {
    //         res.status(400).json({
    //             ok: false,
    //             message: 'No existe una especialidad con ese ID'
    //         });
    //     }
    //     await Especialidad.findByIdAndDelete(id);
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Especialidad eliminada Correctamente'
    //     });

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error interno del sistema al eliminar la especialidad'
    //     });
    // }
};

module.exports = {
    getDetalleVenta: getDetalleVenta,
    getDetalleVentaPa: getDetalleVentaPa,
    getDetalleVentaBy: getDetalleVentaBy,
    createDetalleVenta: createDetalleVenta,
    updateDetalleVenta: updateDetalleVenta,
    deleteDetalleVenta: deleteDetalleVenta
};