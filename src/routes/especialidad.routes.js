/*
Ruta: /api/especialidad
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getEspecialidad, getEspecialidadBy, createEspecialidad, updateEspecialidad, deleteEspecialidad } = require('../controllers/especialidad.controllers');

const router = Router();


router.get('/', validarJWT, getEspecialidad);

router.get('/:id', validarJWT, getEspecialidadBy);

router.post('/', [
    validarJWT,
    check('name', 'El nombre de la especialidad es obligatorio').not().isEmpty(),
    validarCampo
], createEspecialidad);

router.put('/:id', [
    validarJWT,
    check('name', 'El nombre de la especialidad es obligatorio').not().isEmpty(),
    validarCampo
], updateEspecialidad);

router.delete('/:id', deleteEspecialidad);


module.exports = router;