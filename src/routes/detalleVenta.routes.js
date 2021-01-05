/*
Ruta: /api/detalleVenta
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDetalleVenta,
    getDetalleVentaBy,
    getDetalleVentaPa,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} = require('../controllers/detalleVenta.controllers');

const router = Router();


router.get('/', validarJWT, getDetalleVenta);

router.get('/paginado', validarJWT, getDetalleVentaPa);

router.get('/:id', validarJWT, getDetalleVentaBy);

router.post('/', [
    validarJWT,
    validarCampo
], createDetalleVenta);

router.put('/:id', [
    validarJWT,
    validarCampo
], updateDetalleVenta);

router.delete('/:id', validarJWT, deleteDetalleVenta);


module.exports = router;