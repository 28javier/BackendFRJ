/*
Ruta: /api/especialidad
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { getEspecialidad, getEspecialidadBy, createEspecialidad, updateEspecialidad, deleteEspecialidad } = require('../controllers/especialidad.controllers');

const router = Router();


router.get('/', getEspecialidad);

router.get('/:id', getEspecialidadBy);

router.post('/', [
    check('name', 'El nombre de la especialidad es obligatorio').not().isEmpty(),
    validarCampo
], createEspecialidad);

router.put('/:id', updateEspecialidad);

router.delete('/:id', deleteEspecialidad);


module.exports = router;