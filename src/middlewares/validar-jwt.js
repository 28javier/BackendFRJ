const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res = response, next) => {

    //LEER EL TOKEN    
    const token = req.header('x-token');

    // console.log(token);
    if (!token) {
        return res.status(401).json({
            ok: false,
            message: 'No hay token en la Petición'
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRT);
        req.id = id;
        next();
        // console.log(id);

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token no Válido'
        });
    }
};



module.exports = {
    validarJWT
}