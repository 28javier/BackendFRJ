/**
 * path: /api/categorias
 */


const { Router } = require('express');
const {
    getCategorias,
    getCategoriaBy,
    createCategoria,
    updateCategoria,
    deleteCategoria
} = require('../controllers/categoria.controllers');



const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoriaBy);
router.post('/', createCategoria);
router.put('/:id', updateCategoria);
router.delete('/:id', deleteCategoria);


module.exports = router;