// importaciones
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
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



// puerto donde escucha el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el PORT ' + process.env.PORT);
});

//rutas 
app.use('/api/usuarios', require('./routes/usuarios.route'));
app.use('/api/especialidades', require('./routes/especialidad.route'));
app.use('/api/login', require('./routes/auth.route'));