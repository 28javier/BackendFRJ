/**
 * path: /api/todo:busqueda
 */



const { Router } = require('express');
const expreesFileUpload = require('express-fileupload');
const { validarJWT } = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads.controllers');


const router = Router();

router.use(expreesFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);
router.get('/:tipo/:foto', retornaImagen);





module.exports = router;