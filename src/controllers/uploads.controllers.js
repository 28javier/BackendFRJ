const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizarImagen');



const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    // validar tipo
    const tiposValidos = ['productos', 'usuarios'];
    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            message: 'No es un usuario o producto (tipo)'
        });
    }
    // validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            message: 'No hay ningun archivo seleccionado'
        });
    }
    // procesar la imagen.....
    const file = req.files.imagen;
    // obtenr extension de la imagen
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // validar extension
    const extensionValida = ['png', 'jpg', 'jpeg', 'git'];
    if (!extensionValida.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            message: 'No se puede subir ese archivo con esa extension'
        });
    }
    // generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `src/uploads/${ tipo }/${ nombreArchivo }`;
    // mover la imagen
    file.mv(path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                message: 'Error al mover la Imagen'
            });
        }
        //actualizar la base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.status(200).json({
            ok: true,
            message: 'Archivo subido Correctamente',
            nombreArchivo: nombreArchivo
        });
    });
};

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }

};



module.exports = {
    fileUpload: fileUpload,
    retornaImagen: retornaImagen
};