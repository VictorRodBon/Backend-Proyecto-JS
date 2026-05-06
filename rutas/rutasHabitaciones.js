const express = require('express');
const router = express.Router();
const controladorHabitaciones = require('../controladores/controladorHabitaciones.js');

router.get('/', controladorHabitaciones.getHabitaciones);
router.get('/:id', controladorHabitaciones.getHabitacionById);
router.post('/', controladorHabitaciones.crearHabitacion);
router.put('/:id', controladorHabitaciones.actualizarHabitacion);

module.exports = router;