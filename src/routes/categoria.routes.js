/**
 * path: /api/categorias
 */


const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const {
    getCategorias,
    getCategoriaBy,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getCategoriasPa
} = require('../controllers/categoria.controllers');



const router = Router();

router.get('/', validarJWT, getCategorias);
router.get('/paginado', validarJWT, getCategoriasPa);
router.get('/:id', validarJWT, getCategoriaBy);
router.post('/', [
    validarJWT,
    check('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    validarCampo
], createCategoria);
router.put('/:id', [
    validarJWT,
    check('nombreCategoria', 'El nombre de la categoria es obligatorio').not().isEmpty(),
    // check('descripcionCategoria', 'La descripcion de la categoria es obligatorio').not().isEmpty(),
    validarCampo
], updateCategoria);
router.delete('/:id', validarJWT, deleteCategoria);


module.exports = router;