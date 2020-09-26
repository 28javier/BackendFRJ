/*
Ruta: /api/usuarios
*/


const { Router } = require('express');
const { getUsuarios } = require('../controllers/usuarios.controllers');

const router = Router();


router.get('/', getUsuarios);


module.exports = router;