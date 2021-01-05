/*
Ruta: /api/ventas
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const {
    listadoVentas,
    listarVentasPa,
    getVentaBy,
    detalleVentas,
    createVenta,
    updateVenta,
    deleteVenta
} = require('../controllers/ventas.controllers');

const router = Router();


router.get('/', validarJWT, listadoVentas);

router.get('/paginado', validarJWT, listarVentasPa);

router.get('/detalleVenta/:id', validarJWT, detalleVentas);

router.get('/:id', validarJWT, getVentaBy);

router.post('/', [
    validarJWT,
    validarCampo
], createVenta);

router.put('/:id', [
    validarJWT,
    validarCampo
], updateVenta);

router.delete('/:id', validarJWT, deleteVenta);


module.exports = router;