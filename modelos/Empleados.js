const mongoose = require('mongoose');

const EmpleadoSchema = new mongoose.Schema({
    id: { type: String, required: true },
    nombre: { type: String, required: true },
    puesto: { type: String, required: true },
    usuario: { type: String, required: true },
    edad: { type: Number, required: true },
    salario: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Empleados', EmpleadoSchema);