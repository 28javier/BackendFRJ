/**
 * path: /api/todo:busqueda
 */



const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColecion } = require('../controllers/busquedas.contollers');


const router = Router();

router.get('/:busqueda', validarJWT, getTodo);
router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColecion);





module.exports = router;