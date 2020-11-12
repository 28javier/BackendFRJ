const { models } = require("mongoose")

const Usuario = require('../models/usuarios.model');
const Producto = require('../models/producto.model');
const Paciente = require('../models/paciente.model');



const getTodo = async(req, res) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuario, producto, paciente] = await Promise.all([
        Usuario.find({ email: regex }),
        Producto.find({ nombreProducto: regex }),
        Paciente.find({ nombreP: regex }),
    ]);
    res.status(200).json({
        ok: true,
        message: 'Buscado',
        usuario: usuario,
        producto: producto,
        paciente: paciente
    });

}

const getDocumentosColecion = async(req, res) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    let data = [];
    switch (tabla) {
        case 'usuarios':
            data = await Usuario.find({ apellido1: regex });

            break;

        case 'productos':
            data = await Producto.find({ nombreProducto: regex });

            break;

        case 'pacientes':
            data = await Paciente.find({ apellidoP: regex });

            break;

        default:
            return res.status(400).json({
                ok: false,
                message: 'La tabla tiene que se /usuarios/productos/pacientes'
            });

    }

    res.status(200).json({
        ok: true,
        resultados: data
    });
}


module.exports = {
    getTodo: getTodo,
    getDocumentosColecion: getDocumentosColecion
}