const { request, response } = require('express');
const Categoria = require('../models/categoria.model');




const getCategorias = async(req, res = response) => {


    try {
        const categoria = await Categoria.find()
            .populate('usuario', 'email');
        res.status(200).json({
            ok: true,
            mesage: 'Todas las especialidades',
            categoria: categoria
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

    const id = req.params.id;
    try {
        const categoriaID = await Categoria.findById(id);
        if (!categoriaID) {
            res.status(400).json({
                ok: false,
                message: 'No existe una categoria con ese ID'
            });
        }
        const categoriaDB = await Categoria.findById(id)
            .populate('usuario', 'email');
        res.status(200).json({
            ok: true,
            message: 'Datos de la categoria ID',
            categoria: categoriaDB
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

    const id = req.id; //id del usuario
    const { nombreCategoria, descripcionCategoria } = req.body;

    try {
        const existeNombreC = await Categoria.findOne({ nombreCategoria: nombreCategoria });
        if (existeNombreC) {
            return res.status(400).json({
                ok: false,
                message: 'El nombre de esta categoria esta ya esta creado'
            });
        }
        const categoria = new Categoria({ usuario: id, ...req.body });

        const categoriaDB = await categoria.save();
        res.status(200).json({
            ok: true,
            message: 'Categoria creada correctamente',
            categoria: categoriaDB
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

    const idC = req.params.id;
    const id = req.id; //id del usaurio que modifica la categoria
    try {
        const categoria = await Categoria.findById(idC);
        if (!categoria) {
            res.status(404).json({
                ok: false,
                message: 'No se encontro la categoria por el Id'
            });
        }
        const cambioCategoria = {...req.body, usuario: id }
        const categoriaActualizada = await Categoria.findByIdAndUpdate(idC, cambioCategoria, { new: true });

        res.status(200).json({
            ok: true,
            message: 'Datos de la Categoria Modificado',
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};

const deleteCategoria = async(req, res) => {

    const id = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(id);
        if (!categoriaDB) {
            res.status(400).json({
                ok: false,
                message: 'No existe una categoria con ese ID'
            });
        }
        await Categoria.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            message: 'Categoria eliminada Correctamente'
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