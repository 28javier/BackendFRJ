const { Router } = require('express');


const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');


const {
    getDatosGeneralesUserBy,
    createDatosGeneralesUser,
    updateDatosGeneralesUser,
    deleteDatosGeneralesUser
} = require('../controllers/datosGeneralesUser.controllers');





const router = Router();


router.get('/:id', validarJWT, getDatosGeneralesUserBy);
router.post('/', [
    validarJWT,
    check('cedula', 'El # de cedula debe ser obligatorio').not().isEmpty(),
    // check('sexo', 'El sexo debe ser obligatorio').not().isEmpty(),
    // check('fechaNacimiento', 'La fecha de nacimineto debe ser obligatorio').not().isEmpty(),
    // check('estadoCivil', 'El estado civil debe ser obligatorio').not().isEmpty(),
    // check('tipoDeSangre', 'El tipo de sangre debe ser obligatorio').not().isEmpty(),
    // check('direcciones', 'La direccion debe ser obligatorio').not().isEmpty(),
    // check('celulares', 'El # de celular debe ser obligatorio').not().isEmpty(),
    // check('usuario', 'El ID del usuario no es valido').isMongoId(),
    validarCampo
], createDatosGeneralesUser);
router.put('/:id', validarJWT, updateDatosGeneralesUser);
router.delete('/:id', validarJWT, deleteDatosGeneralesUser);



module.exports = router;