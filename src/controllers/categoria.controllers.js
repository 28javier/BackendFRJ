const { request, response } = require('express');
const Categoria = require('../models/categoria.model');




const getCategorias = async(req, res = response) => {
    try {

        res.status(200).json({
            ok: true,
            message: 'Datos Generales de la categoria',

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const getCategoriaBy = async(req, res = response) => {
    try {

        res.status(200).json({
            ok: true,
            message: 'Datos Generales de la categoria ID',

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const createCategoria = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales de la Categoria creado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const updateCategoria = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales de la Categoria Modificado',

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteCategoria = async(req, res = response) => {


    try {
        res.status(200).json({
            ok: true,
            message: 'Datos Generales de la Categoria elimado',

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
    getCategorias,
    getCategoriaBy,
    createCategoria,
    updateCategoria,
    deleteCategoria
};