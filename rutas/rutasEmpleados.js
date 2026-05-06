const express = require('express');
const router = express.Router();
const controladorEmpleados = require('../controladores/controladorEmpleados');

router.get('/', controladorEmpleados.getEmpleados);
router.get('/:id', controladorEmpleados.getEmpleadoById);
router.put('/:id', controladorEmpleados.actualizarEmpleado);

module.exports = router;