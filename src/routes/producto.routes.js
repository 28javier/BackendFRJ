/**
 * paht: /api/productos
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');

const {
    getProductos,
    getProductosPa,
    getProductoBy,
    listarProducto,
    createProducto,
    updateProducto,
    deleteProducto,
    aumentarStockProducto,
    getImg
} = require('../controllers/producto.controllers');


const router = Router();


router.get('/', validarJWT, getProductos);
router.get('/paginado', validarJWT, getProductosPa);

router.get('/:id', validarJWT, getProductoBy);

router.get('/producto/:nombre?', validarJWT, listarProducto);

router.get('/producto/img/:img', validarJWT, getImg);


router.post('/', [
    validarJWT,
    check('codigoProducto', 'El codigo del producto es obligatorio').not().isEmpty(),
    check('nombreProducto', 'El nombre del producto es obligatorio').not().isEmpty(),
    check('stockProducto', 'El stock del producto es obligatorio').not().isEmpty(),
    // check('descripcionProducto', 'La descripcion del producto es obligatorio').not().isEmpty(),
    check('categoria', 'El ID de la Categoria no es valido').isMongoId(),
    validarCampo
], createProducto);

router.put('/:id', validarJWT, updateProducto);

router.put('/stock/:id', validarJWT, aumentarStockProducto);


router.delete('/:id', validarJWT, deleteProducto);

module.exports = router;