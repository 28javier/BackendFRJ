/*
Ruta: /api/usuarios
*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');


const { getUsuarios, getUsuarioBy, createUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarios.controllers');
const { validarJWT, validarAdmin_Role } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT, getUsuarios);

router.get('/:id', validarJWT, getUsuarioBy);

router.post('/', [

    check('nombre1', 'El primer nombre es obligatorio').not().isEmpty(),
    check('nombre2', 'El segundo nombre es obligatorio').not().isEmpty(),
    check('apellido1', 'El primer apellido es obligatorio').not().isEmpty(),
    check('apellido2', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('especialidad', 'El id de la especialidad no es valido').isMongoId(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampo
], createUsuarios);

router.put('/:id', [
    validarJWT,
    validarAdmin_Role,
    check('nombre1', 'El primer nombre es obligatorio').not().isEmpty(),
    check('nombre2', 'El segundo nombre es obligatorio').not().isEmpty(),
    check('apellido1', 'El primer apellido es obligatorio').not().isEmpty(),
    check('apellido2', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('role', 'El role es obligatorio').not().isEmpty(),
    check('especialidad', 'El id de la especialidad no es valido').isMongoId(),
    check('email', 'El email es obligatorio').isEmail(),
], updateUsuario);

router.delete('/:id', validarJWT, deleteUsuario);



module.exports = router;