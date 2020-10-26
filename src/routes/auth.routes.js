/*
path: /api/login
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, renewToken } = require('../controllers/auth.controllers');

const router = Router();


router.post('/', [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampo
], login);


router.get('/renew',
    validarJWT,
    renewToken
);

module.exports = router;