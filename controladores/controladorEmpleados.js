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
        const empleado = await Empleado.findOne({ id }).select('-password');
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json(empleado);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el empleado', err });
    }
};

const crearEmpleado = async (req, res) => {
    try {
        const { nombre, puesto, usuario, edad, salario, email, password } = req.body;

        const existing = await Empleado.findOne({ usuario });
        if (existing) return res.status(400).json({ message: 'El usuario ya existe' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = Date.now().toString();

        const nuevoEmpleado = new Empleado({
            id,
            nombre,
            puesto,
            usuario,
            edad,
            salario,
            email,
            password: hashedPassword
        });

        await nuevoEmpleado.save();
        res.status(201).json({ message: 'Empleado creado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al crear el empleado', error: err.message });
    }
};

const eliminarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const empleado = await Empleado.findOneAndDelete({ id });
        if (!empleado) return res.status(404).json({ message: 'Empleado no encontrado' });
        res.status(200).json({ message: 'Empleado eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ message: 'Error al eliminar el empleado', error: err.message });
    }
};

const actualizarEmpleado = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const empleado = await Empleado.findOneAndUpdate(
            { id },
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
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
};