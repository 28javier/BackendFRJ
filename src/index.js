// importaciones
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const moment = require('moment');
const { dbConnection } = require('./database/config');

//--------------------------//
//configuraciones del sevidor//
//--------------------------//

// creacion del servidor express
const app = express();



// heroku

// mildlewares
// configuracion del cors
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//base de dato rum
dbConnection();

// Directorio público
app.use(express.static('./src/public'));

//rutas
//usuarios del sistema
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
// app.use('/api/datosGeneralesUsuarios', require('./routes/datosGeneralesUser.routes'));
app.use('/api/especialidades', require('./routes/especialidad.routes'));
// productos y categoria
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/productos', require('./routes/producto.routes'));
// pacientes
app.use('/api/pacientes', require('./routes/paciente.routes'));
//consultas
app.use('/api/evaluacionPaciente', require('./routes/evaluacionPaciente.routes'));
//busquedas
app.use('/api/todo', require('./routes/busquedas.routes'));
//imagenes
app.use('/api/upload', require('./routes/uploads.routes'));
//Ventas y detalles
app.use('/api/ventas', require('./routes/venta.routes'));
app.use('/api/detalleVenta', require('./routes/detalleVenta.routes'));





// puerto donde escucha el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el PORT ' + process.env.PORT);
});



// mongodb+srv://RostroJesus:frj28.@cluster0.wfulv.mongodb.net/FRJBDD?authSource=admin&replicaSet=atlas-i2eq2f-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true