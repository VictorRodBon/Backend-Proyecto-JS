require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const cors = require('cors');
const rutasUsuarios = require('./rutas/rutasClientes');

const app = express();

// Crear un stream para escribir en el archivo de log
const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Permite recibir JSON en peticiones POST
app.use(express.json());

// cors
app.use(cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    credentials: true
}))

// Conexión a MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/usuarios', rutasUsuarios);

app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));