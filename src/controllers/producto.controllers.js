const { request, response } = require('express');
const Producto = require('../models/producto.model');




const getProductos = async(req, res = response) => {
    try {

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto',

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
    try {

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto ID',

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


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto creado',

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


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto Modificado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteProducto = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto elimado',

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