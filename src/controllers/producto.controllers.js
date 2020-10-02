const { response } = require('express');
const Producto = require('../models/producto.model');




const getProductos = async(req, res = response) => {
    try {

        const productos = await Producto.find()
            .populate('categoria', 'nombreCategoria');

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto',
            producto: productos

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const getProductoBy = async(req, res = response) => {

    const id = req.params.id;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un producto por ese ID'
            });
        }
        const productoDB = await Producto.findById(id)
            .populate('categoria', 'nombreCategoria');

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto ID',
            producto: productoDB

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const createProducto = async(req, res = response) => {

    const id = req.id; //id del usuario
    const {
        nombreProducto,
        stockProducto,
        precioProducto,
        descripcionProducto,
        usuario,
        categoria
    } = req.body;
    try {
        const existeNombreP = await Producto.findOne({ nombreProducto: nombreProducto });
        if (existeNombreP) {
            return res.status(400).json({
                ok: false,
                message: 'El nombre del producto ya esta creado'
            });
        }
        const producto = new Producto({ usuario: id, ...req.body });
        const productoDB = await producto.save();
        res.status(200).json({
            ok: true,
            message: 'Producto creado correctamente',
            producto: productoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateProducto = async(req, res = response) => {

    const idP = req.params.id;
    const id = req.id; //id del usaurio que modifica el producto
    try {
        const producto = await Producto.findById(idP);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un producto con ese ID'
            });
        }
        const cambiosProductos = {...req.body, usuario: id }
        const productoDB = await Producto.findByIdAndUpdate(idP, cambiosProductos, { new: true });
        res.status(200).json({
            ok: true,
            message: 'Producto Modificado correctamente',
            producto: productoDB

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteProducto = async(req, res) => {

    const id = req.params.id;

    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'No existe un producto con ese ID'
            });
        }
        await Producto.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Producto elimado correctamente',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};


module.exports = {
    getProductos,
    getProductoBy,
    createProducto,
    updateProducto,
    deleteProducto
};