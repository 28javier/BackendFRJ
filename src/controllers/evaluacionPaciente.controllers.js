const { response } = require('express');
const EvaluacionPaciente = require('../models/evaluacionPaciente.model');




const evaluacionPacienteBy = async(req, res = response) => {

    const id = req.params.id;
    try {
        const evaluacionId = await EvaluacionPaciente.findById(id);
        if (!evaluacionId) {
            res.status(400).json({
                ok: false,
                message: 'No existe este ID para obtener la evaluacion del paciente'
            });
        }
        const evaluacionDB = await EvaluacionPaciente.findById(id)
            .populate('paciente', 'cedulaP nombreP2 apellidoP, apellidoP2')
            .populate('usuario', 'email');
        res.status(200).json({
            ok: true,
            message: 'Evaluacion de paciente correctamente',
            evaluacionPaciente: evaluacionDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const createEvaluacionPaciente = async(req, res = response) => {

    const id = req.id; //id del usuario
    const { motivoConsulta, tratamiento, evolucion, usuario, paciente } = req.body;

    try {

        const evaluacionPaciente = new EvaluacionPaciente({ usuario: id, ...req.body });

        const evaluacionPacienteDB = await evaluacionPaciente.save();
        res.status(200).json({
            ok: true,
            message: 'Evaluacion creada correctamente',
            evaluacion: evaluacionPacienteDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateEvaluacionPaciente = async(req, res = response) => {

    const idP = req.params.id;
    const id = req.id; //id del usaurio que modifica la categoria
    try {
        const evaluacion = await EvaluacionPaciente.findById(idP);
        if (!evaluacion) {
            res.status(404).json({
                ok: false,
                message: 'No se encontro la Evaluacion por el Id'
            });
        }
        const cambioEvaluacion = {...req.body, usuario: id }
        const evaluacionActualizada = await EvaluacionPaciente.findByIdAndUpdate(idP, cambioEvaluacion, { new: true });

        res.status(200).json({
            ok: true,
            message: 'Datos de la Evaluacion Modificado',
            evaluacionPaciente: evaluacionActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteEvaluacionPaciente = async(req, res) => {

    const id = req.params.id;
    try {
        const evaluacionDB = await EvaluacionPaciente.findById(id);
        if (!evaluacionDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe una evaluacion con ese ID'
            });
        }
        await EvaluacionPaciente.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Evaluacion eliminada Correctamente'
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
    evaluacionPacienteBy: evaluacionPacienteBy,
    createEvaluacionPaciente: createEvaluacionPaciente,
    updateEvaluacionPaciente: updateEvaluacionPaciente,
    deleteEvaluacionPaciente: deleteEvaluacionPaciente
};