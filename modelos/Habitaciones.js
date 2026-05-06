const mongoose = require('mongoose');

const HabitacionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    price: { type: Number, required: true },
    beds: { type: String, required: true },
    ocuped: { type: Boolean, required: true },
    floor: { type: Number, required: true },
    maxGests: { type: Number, required: true },
});

module.exports = mongoose.model('Habitaciones', HabitacionSchema);