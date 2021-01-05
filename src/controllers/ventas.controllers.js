const { response } = require('express');
const Venta = require('../models/venta.model');
const DetalleVenta = require('../models/detalleVenta.model');
const Producto = require('../models/producto.model');


const listadoVentas = async(req, res) => {
    try {
        const venta = await Venta.find()
            .populate('usuario', 'nombre1 nombre2 apellido1 apellido2 email')
            .populate('paciente', 'nombreP nombreP2 apellidoP apellidoP2 cedulaP celularesP');
        res.status(200).json({
            ok: true,
            mesage: 'Todas las Ventas',
            venta: venta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};


const listarVentasPa = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    // const productos = await Producto.find()
    //     .populate('usuario', 'email')
    //     .populate('categoria', 'nombreCategoria');
    const [ventas, totalVentas] = await Promise.all([
        Venta.find()
        .populate('usuario', 'nombre1 nombre2 apellido1 apellido2 email')
        .populate('paciente', 'nombreP nombreP2 apellidoP apellidoP2 cedulaP celularesP')
        .skip(desde)
        .limit(15),
        Venta.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        message: 'Datos de las ventas',
        venta: ventas,
        totalVentas: totalVentas

    });


};

const detalleVentas = async(req, res) => {

    const id = req.params.id;

    DetalleVenta.find({ venta: id })
        .populate('idproducto', 'codigoProducto nombreProducto stockProducto precioProducto descripcionProducto img')
        .exec((err, data_detalles) => {
            if (data_detalles) {
                res.status(200).json({
                    ok: true,
                    message: 'Detalles de las Ventas',
                    detallesVentas: data_detalles
                });
            } else {
                res.status(400).json({
                    ok: false,
                    message: 'No hay ningun Registro de Venta'
                });
            }
        })
};

const getVentaBy = async(req, res) => {

    const id = req.params.id;

    await Venta.findById(id).populate('paciente')
        .populate('usuario').exec((err, dataVenta) => {
            if (dataVenta) {
                DetalleVenta.find({ venta: dataVenta._id }).populate('idproducto').exec({ venta: id }, (err, dataDetalle) => {
                    if (dataDetalle) {
                        res.status(200).send({
                            data: {
                                message: true,
                                venta: dataVenta,
                                detalles: dataDetalle
                            }
                        });
                    }
                });
            }
        });

};

const createVenta = async(req, res) => {

    let data = req.body;
    var venta = new Venta();
    venta.usuario = data.usuario;
    venta.paciente = data.paciente;

    venta.save((err, ventaSave) => {
        if (ventaSave) {
            let detalles = data.detalles;
            detalles.forEach((element, index) => {
                var detalleVenta = new DetalleVenta();
                detalleVenta.idproducto = element.idproducto;
                detalleVenta.cantidad = element.cantidad;
                detalleVenta.venta = ventaSave._id;
                detalleVenta.save((err, detalleSave) => {
                    if (detalleSave) {
                        Producto.findById({ _id: element.idproducto }, (err, productoData) => {
                            if (productoData) {
                                Producto.findByIdAndUpdate({ _id: productoData._id }, { stockProducto: parseInt(productoData.stockProducto) - parseInt(element.cantidad) },
                                    (err, productoEdit) => {
                                        res.end();
                                    });
                            } else {
                                res.send('No se encontro el producto');
                            }
                        });
                    } else {
                        res.send('No se pudo registrar los Datos');
                    }
                });
            });
        } else {
            res.send('No se pudo registrar los Datos');
        }
    });

};

const updateVenta = async(req, res) => {

    // const idE = req.params.id;
    // const id = req.id; //id del usaurio que modifica la especialidad
    // try {
    //     const especialidad = await Especialidad.findById(idE);
    //     if (!especialidad) {
    //         res.status(404).json({
    //             ok: false,
    //             message: 'No se encontro la especialidad por el Id'
    //         });
    //     }
    //     const cambioEspecialidad = {...req.body, usuario: id }
    //     const especialidadActualizada = await Especialidad.findByIdAndUpdate(idE, cambioEspecialidad, { new: true });
    //     res.status(200).json({
    //         ok: true,
    //         message: 'Especialidad actualizada correctamente',
    //         especialidad: especialidadActualizada
    //     });
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         message: 'Error inesperado... revisar logs'
    //     });
    // }

};

const deleteVenta = async(req, res) => {
    // const venta = await Venta.findByIdAndDelete(req.params.id);
    const id = req.params.id;

    try {
        const ventaDB = await Venta.findById(id);
        if (!ventaDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe una venta con ese ID'
            });
        }
        await Venta.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Venta eliminada Correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error interno del sistema al eliminar la venta'
        });
    }
};

module.exports = {
    listadoVentas: listadoVentas,
    listarVentasPa: listarVentasPa,
    detalleVentas: detalleVentas,
    getVentaBy: getVentaBy,
    createVenta: createVenta,
    updateVenta: updateVenta,
    deleteVenta: deleteVenta
};