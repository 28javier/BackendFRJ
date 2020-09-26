// importaciones
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');
require('dotenv').config();

//--------------------------//
//configuraciones del sevidor//
//--------------------------//

// creacion del servidor express
const app = express();

// configuracion del cors
app.use(cors());

//base de dato rum
dbConnection();

// puerto donde escucha el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el PORT ' + process.env.PORT);
});

//rutas 
app.use('/api/usuarios', require('./routes/usuarios.route'));