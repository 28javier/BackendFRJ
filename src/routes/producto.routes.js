/**
 * paht: /api/productos
 */

const { Router } = require('express');
const {
    getProductos,
    getProductoBy,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/producto.controllers');


const router = Router();



router.get('/', getProductos);
router.get('/:id', getProductoBy);
router.post('/', createProducto);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;