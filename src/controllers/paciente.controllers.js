// const { response } = require('express');
const Paciente = require('../models/paciente.model');




const getPacientes = async(req, res) => {

    try {
        const pacientes = await Paciente.find()
            .populate('usuario', 'email');
        res.status(200).json({
            ok: true,
            message: 'Obtenidos todos los pacientes',
            pacientes: pacientes,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};
const getPacientesPa = async(req, res) => {

    try {
        const desde = Number(req.query.desde) || 0;
        const [paciente, TotalPaciente] = await Promise.all([
            Paciente.find()
            .populate('usuario', 'email')
            .skip(desde)
            .limit(10),
            Paciente.countDocuments()
        ])
        res.status(200).json({
            ok: true,
            message: 'Obtenidos todos los pacientes',
            paciente: paciente,
            TotalPaciente: TotalPaciente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const getPacienteBy = async(req, res) => {

    const id = req.params.id;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                message: 'Paciente no encontrado por ese ID'
            });
        }
        const pacienteDB = await Paciente.findById(id)
            .populate('usuario', 'email');
        res.status(200).json({
            ok: true,
            message: 'Obtenido paciento por ID',
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const createPaciente = async(req, res) => {

    const id = req.id; //id del usuario que crea al paciente
    const {
        nombreP,
        nombreP2,
        apellidoP,
        apellidoP2,
        cedulaP,
        sexoP,
        edadP,
        fechaNacimientoP,
        estadoCivilP,
        tipoDeSangreP,
        direcionesP,
        celularesP
    } = req.body;
    try {
        const existeCedula = await Paciente.findOne({ cedulaP: cedulaP });
        if (existeCedula) {
            return res.status(400).json({
                ok: false,
                message: 'El Paciente con este numero de cedula ya fue creado'
            });
        }
        const paciente = new Paciente({ usuario: id, ...req.body });
        const pacienteDB = await paciente.save();
        res.status(200).json({
            ok: true,
            message: 'Paciente creado correctamente',
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updatePaciente = async(req, res) => {
    const id = req.id; //id del usaurio que modifica el paciente
    const idP = req.params.id;
    try {
        const paciente = await Paciente.findById(idP);
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un paciente con ese ID'
            });
        }
        const cambiosPaciente = {...req.body, usuario: id }
        const pacienteDB = await Paciente.findByIdAndUpdate(idP, cambiosPaciente, { new: true });

        res.status(200).json({
            ok: true,
            message: 'Paciente modificado correctamente',
            paciente: pacienteDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deletePaciente = async(req, res) => {

    const id = req.params.id;
    try {
        const paciente = await Paciente.findById(id);
        if (!paciente) {
            return res.status(404).json({
                ok: false,
                message: 'No se pudo encontrar un usuario con ese Id para eliminarlo'
            });
        }
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Paciente elminado correctamente'
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
    getPacientes: getPacientes,
    getPacientesPa: getPacientesPa,
    getPacienteBy: getPacienteBy,
    createPaciente: createPaciente,
    updatePaciente: updatePaciente,
    deletePaciente: deletePaciente
};