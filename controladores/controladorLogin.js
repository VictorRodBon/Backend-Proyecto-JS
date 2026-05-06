const bcrypt = require('bcrypt');
const Cliente = require('../modelos/Clientes.js');
const Empleado = require('../modelos/Empleados.js');
const { validationResult } = require('express-validator');

const usuarioLogin = async (req, res) => {
    try {
        const { identificador, password } = req.body;
        
        let usuario = await Cliente.findOne({ mail: identificador });
        let tipo = 'cliente';

        if (!usuario) {
            usuario = await Empleado.findOne({ 
                $or: [{ usuario: identificador }, { email: identificador }] 
            });
            tipo = 'empleado';
        }

        if (!usuario) return res.status(401).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch) return res.status(401).json({ message: 'Usuario o clave incorrecta' });

        req.session.usuarioId = usuario._id;
        req.session.tipo = tipo;

        res.json({ tipo });
    } catch (error) {
        res.status(500).json({ message: 'Error en el login', error });
    }
};

const usuarioLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout correcto' });
    });
};

module.exports = {
    usuarioLogin,
    usuarioLogout
};