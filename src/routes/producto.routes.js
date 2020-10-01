/**
 * paht: /api/productos
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const {
    getProductos,
    getProductoBy,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/producto.controllers');


const router = Router();



router.get('/', validarJWT, getProductos);

router.get('/:id', validarJWT, getProductoBy);

router.post('/', [
    validarJWT,
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('stockProducto', 'El stock del producto es obligatorio').not().isEmpty(),
    check('descripcionProducto', 'La descripcion del producto es obligatorio').not().isEmpty(),
    check('categoria', 'El ID de la Categoria no es valido').isMongoId(),
    validarCampo
], createProducto);

router.put('/:id', validarJWT, updateProducto);

router.delete('/:id', validarJWT, deleteProducto);

module.exports = router;