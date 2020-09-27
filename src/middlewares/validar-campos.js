const { response } = require('express');
const { validationResult } = require('express-validator');


const validarCampo = (req, res = response, next) => {
    //controlar errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }
    next();

};

module.exports = {
    validarCampo
}