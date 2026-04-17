const express = require('express');
const router = express.Router();
const controladorClientes = require('../controladores/controladorClientes');
const { validarRegistro, validarLogin } = require('../util/validate.js');



router.post('/registro', [validarRegistro, controladorClientes.clienteRegistro]);
router.post('/login', controladorClientes.clienteLogin);
router.post('/logout', controladorClientes.clienteLogout);

module.exports = router;