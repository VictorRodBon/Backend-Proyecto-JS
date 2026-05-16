const express = require('express');
const router = express.Router();
const controladorEmpleados = require('../controladores/controladorEmpleados');

router.get('/', controladorEmpleados.getEmpleados);
router.get('/:id', controladorEmpleados.getEmpleadoById);
router.post('/', controladorEmpleados.crearEmpleado);
router.put('/:id', controladorEmpleados.actualizarEmpleado);
router.delete('/:id', controladorEmpleados.eliminarEmpleado);

module.exports = router;