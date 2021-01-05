// const { response } = require('express'); 
const Producto = require('../models/producto.model');
var path = require('path');

const getProductos = async(req, res) => {

    try {
        const productos = await Producto.find()
            .populate('usuario', 'email')
            .populate('categoria', 'nombreCategoria');

        res.status(200).json({
            ok: true,
            message: 'Datos Generales del Producto',
            productos: productos,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Error inesperado... revisar logs'
        });
    }
};


const getProductosPa = async(req, res) => {

    const desde = Number(req.query.desde) || 0;

    // const productos = await Producto.find()
    //     .populate('usuario', 'email')
    //     .populate('categoria', 'nombreCategoria');
    const [productos, totalProductos] = await Promise.all([
        Producto.find()
        .populate('usuario', 'email')
        .populate('categoria', 'nombreCategoria')
        .skip(desde)
        .limit(5),
        Producto.countDocuments()
    ]);

    res.status(200).json({
        ok: true,
        message: 'Datos Generales del Producto',
        producto: productos,
        totalProductos: totalProductos

    });


};

const getProductoBy = async(req, res) => {

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
            .populate('usuario', 'email')
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

const listarProducto = async(req, res) => {
    let nombre = req.params.nombre;
    await Producto.find({ nombreProducto: new RegExp(nombre, 'i') }, (error, productoListado) => {
        if (error) {
            res.status(500).json({ ok: false, message: 'Error inesperado... revisar logs' });
        } else {
            if (productoListado) {
                res.status(200).json({ ok: true, message: 'Obtenido los Productos', productos: productoListado });
            } else {
                res.status(400).json({ ok: false, message: 'No hay un producto con ese titulo' });
            }
        }
    });
};

const aumentarStockProducto = async(req, res) => {
    let id = req.params.id;
    let data = req.body;

    Producto.findById(id, (error, productoData) => {
        if (productoData) {
            Producto.findByIdAndUpdate(id, { stockProducto: parseInt(productoData.stockProducto) + parseInt(data.stockProducto) }, (error, productoEdit) => {
                if (productoEdit) {
                    res.status(200).json({ ok: true, message: 'Stock Actualizado', producto: productoEdit });
                }
            });
        } else {
            res.status(500).json({ ok: false, message: 'Error inesperado... revisar logs' });
        }
    });
};

const createProducto = async(req, res) => {

    const id = req.id; //id del usuario
    const {
        codigoProducto,
        nombreProducto,
        stockProducto,
        precioProducto,
        descripcionProducto,
        usuario,
        categoria
    } = req.body;
    try {
        const existeCodigoP = await Producto.findOne({ codigoProducto: codigoProducto });
        if (existeCodigoP) {
            return res.status(400).json({
                ok: false,
                message: 'Ya esta asigando este codigo a otro producto!!!!!'
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

const updateProducto = async(req, res) => {
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
        const cambiosProductos = {...req.body, usuario: id };
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

const getImg = (req, res) => {
    var img = req.params['img'];

    if (img != "null") {
        let pathImg = path.join(__dirname, '../uploads/productos/' + img);
        // const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
        res.status(200).sendFile(path.resolve(pathImg));
    } else {
        let pathImg = path.join(__dirname, '../uploads/productos/no-img.jpg');
        res.status(200).sendFile(path.resolve(pathImg));
    }
}


module.exports = {
    getProductos: getProductos,
    getProductosPa: getProductosPa,
    getProductoBy: getProductoBy,
    listarProducto: listarProducto,
    createProducto: createProducto,
    updateProducto: updateProducto,
    aumentarStockProducto: aumentarStockProducto,
    deleteProducto: deleteProducto,
    getImg: getImg
};