const { Router } = require('express');


const {
    getDatosGeneralesUserBy,
    createDatosGeneralesUser,
    updateDatosGeneralesUser,
    deleteDatosGeneralesUser
} = require('../controllers/datosGeneralesUser.controllers');





const router = Router();


router.get('/', getDatosGeneralesUserBy);
router.post('/', createDatosGeneralesUser);
router.put('/:id', updateDatosGeneralesUser);
router.delete('/:id', deleteDatosGeneralesUser);




module.exports = router;