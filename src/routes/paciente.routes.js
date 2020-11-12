const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');


const {
    getPacientes,
    getPacientesPa,
    getPacienteBy,
    createPaciente,
    updatePaciente,
    deletePaciente
} = require('../controllers/paciente.controllers');



const router = Router();

router.get('/', getPacientes);
router.get('/paginado', getPacientesPa);
router.get('/:id', getPacienteBy);
router.post('/', [
    validarJWT,
    check('nombreP', 'El primer nombre del paciente es obligatorio').not().isEmpty(),
    check('nombreP2', 'El segundo nombre del paciente es obligatorio').not().isEmpty(),
    check('apellidoP', 'El primer apellido del paciente es obligatorio').not().isEmpty(),
    check('apellidoP2', 'El segundo apellido del paciente es obligatorio').not().isEmpty(),
    check('cedulaP', 'El cedula del paciente es obligatorio').not().isEmpty(),
    // check('sexoP', 'El genero del paciente es obligatorio').not().isEmpty(),
    // check('edadP', 'La edad del paciente es obligatorio').not().isEmpty(),
    // check('fechaNacimientoP', 'La fecha de nacimiento del paciente es obligatorio').not().isEmpty(),
    // check('estadoCivilP', 'El estado civil del paciente es obligatorio').not().isEmpty(),
    // check('tipoDeSangreP', 'El tipo de sangre del paciente es obligatorio').not().isEmpty(),
    // check('numeroDiscapacidadP', 'El numero de discapacidad del paciente es obligatorio').not().isEmpty(),
    // check('direccionesP', 'Las direccion del paciente es obligatorio').not().isEmpty(),
    // check('celularesP', 'El numero telefonico del paciente es obligatorio').not().isEmpty(),
    validarCampo
], createPaciente);
router.put('/:id', [
    validarJWT,
    check('nombreP', 'El primer nombre del paciente es obligatorio').not().isEmpty(),
    check('nombreP2', 'El segundo nombre del paciente es obligatorio').not().isEmpty(),
    check('apellidoP', 'El primer apellido del paciente es obligatorio').not().isEmpty(),
    check('apellidoP2', 'El segundo apellido del paciente es obligatorio').not().isEmpty(),
    check('cedulaP', 'El cedula del paciente es obligatorio').not().isEmpty(),
    // check('sexoP', 'El genero del paciente es obligatorio').not().isEmpty(),
    // check('edadP', 'La edad del paciente es obligatorio').not().isEmpty(),
    // check('fechaNacimientoP', 'La fecha de nacimiento del paciente es obligatorio').not().isEmpty(),
    // check('estadoCivilP', 'El estado civil del paciente es obligatorio').not().isEmpty(),
    // check('tipoDeSangreP', 'El tipo de sangre del paciente es obligatorio').not().isEmpty(),
    // check('numeroDiscapacidadP', 'El numero de discapacidad del paciente es obligatorio').not().isEmpty(),
    // check('direccionesP', 'Las direccion del paciente es obligatorio').not().isEmpty(),
    // check('celularesP', 'El numero telefonico del paciente es obligatorio').not().isEmpty(),
    validarCampo
], updatePaciente);
router.delete('/:id', deletePaciente);





module.exports = router;