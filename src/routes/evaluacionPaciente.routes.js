const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const {
    evolucionPacientes,
    getEvaluacionPa,
    evaluacionPacienteBy,
    createEvaluacionPaciente,
    updateEvaluacionPaciente,
    deleteEvaluacionPaciente
} = require('../controllers/evaluacionPaciente.controllers');
// const { getTodo, getDocumentosColecion } = require('../controllers/busquedas.contollers');


const router = Router();

router.get('/', validarJWT, evolucionPacientes);
router.get('/paginado', validarJWT, getEvaluacionPa);
router.get('/:id', validarJWT, evaluacionPacienteBy);
router.post('/', [validarJWT,
    check('paciente', 'El ID del paciente no es valido').isMongoId(),
    check('usuario', 'El ID del usuario no es valido').isMongoId(),
], createEvaluacionPaciente);
router.put('/:id', validarJWT, updateEvaluacionPaciente);
router.delete('/:id', validarJWT, deleteEvaluacionPaciente);





module.exports = router;