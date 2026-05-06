const bcrypt = require('bcrypt');
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

module.exports = {
    clienteRegistro
};