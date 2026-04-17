const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../modelos/Clientes.js');
const { validationResult } = require('express-validator');

// clave para el hass
const SECRET_KEY = process.env.SECRET_KEY;

// Registro de usuario
const clienteRegistro = async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() });
    }
    try {
        const { id, name, mail, city, password } = req.body;

        // Verificar si ya existe
        const existingCliente = await Usuario2.findOne({ mail });
        if (existingCliente) return res.status(400).json({ message: 'El usuario ya existe' });

        // Cifrar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const nuevoCliente = new Cliente({
            id,
            name,
            mail,
            city,
            password: hashedPassword,
        });

        await nuevoCliente.save();

        res.status(201).json({ message: 'Cliente registrado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Login
const clienteLogin = async (req, res) => {
    try {

        const { mail, password } = req.body;

        // Buscar usuario
        const cliente = await Cliente.findOne({ mail });
        if (!cliente) return res.status(401).json({ message: 'Cliente no encontrado' });

        // Verificar contraseña
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) return res.status(401).json({ message: 'Usuario o clave incorrecta' });

        // Crear token JWT
        const token = jwt.sign({ id: cliente._id, mail: cliente.mail }, SECRET_KEY, { expiresIn: '1h' });
        //res.json({ message: 'Login correcto', token});
        res.json({ message: 'Login correcto', token, cliente: { _id: cliente._id } });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error });
    }
};

// Logout
const clienteLogout = (req, res) => {
    res.json({ message: 'Logout correcto' });
};


module.exports = {
    clienteRegistro,
    clienteLogin,
    clienteLogout,
};