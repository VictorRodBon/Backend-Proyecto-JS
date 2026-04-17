const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    mail: { type: String, required: true },
    password: { type: String, required: true }
});

module.exports = mongoose.model('Clientes', ClienteSchema);