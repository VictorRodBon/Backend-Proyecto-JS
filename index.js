require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const { MongoStore } = require('connect-mongo');

const rutasUsuarios = require('./rutas/rutasClientes');
const rutasHabitaciones = require('./rutas/rutasHabitaciones');
const rutasEmpleados = require('./rutas/rutasEmpleados');

const app = express();

const logStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_URL,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS', 'PUT'],
    credentials: true
}));

app.use(expressSession({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
        mongoUrl: process.env.DB_URL,
        ttl: 60 * 60
    }),
    cookie: {
        httpOnly: true,
        maxAge: 60 * 60 * 1000
    }
}));

mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar MongoDB', err));

app.use('/usuarios', rutasUsuarios);
app.use('/habitaciones', rutasHabitaciones);
app.use('/empleados', rutasEmpleados);

app.use((req, res) => {
    res.status(404).send('Ruta no encontrada');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));