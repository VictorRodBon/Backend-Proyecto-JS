const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Empleado = require('../modelos/Empleados');

const getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.find().select('-password');
        res.status(200).json(empleados);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los empleados', error });
    }
};

const getEmpleadoById = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findById(id).select('-password');
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json(empleado);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el empleado', err });
    }
};

const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const empleado = await Empleado.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        ).select('-password');

        if (!empleado) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        res.status(200).json(empleado);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el empleado", error: err.message });
    }
};

module.exports = {
    getEmpleados,
    getEmpleadoById,
    actualizarEmpleado,
};