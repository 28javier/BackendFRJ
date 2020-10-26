// importaciones
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//--------------------------//
//configuraciones del sevidor//
//--------------------------//

// creacion del servidor express
const app = express();

//base de dato rum
dbConnection();


// mildlewares
// configuracion del cors
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//rutas
//usuarios del sistema
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/datosGeneralesUsuarios', require('./routes/datosGeneralesUser.routes'));
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




// puerto donde escucha el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el PORT ' + process.env.PORT);
});