const getUsuarios = (req, res) => {
    res.json({
        ok: true,
        msg: 'hola mundo',
        edad: 25
    });
}






module.exports = {
    getUsuarios
}