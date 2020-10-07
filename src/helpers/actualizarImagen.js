const fs = require('fs');
const Usuario = require('../models/usuarios.model');
const Producto = require('../models/producto.model');



const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        // borrar imagen anterior
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    // 'productos', 'usuarios'
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No se encontro un usuario por ID');
                return false;
            }
            const pathViejo = `src/uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
            await usuario.save();

            break;
        case 'productos':
            const producto = await Producto.findById(id);
            if (!producto) {
                console.log('No se encontro un producto por ID');
                return false;
            }
            const pathViejoP = `src/uploads/productos/${producto.img}`;
            borrarImagen(pathViejoP);
            producto.img = nombreArchivo;
            await producto.save();
            break;

        default:
            break;
    }
};



module.exports = {
    actualizarImagen: actualizarImagen
}