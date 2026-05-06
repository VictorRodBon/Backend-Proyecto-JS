const express = require('express');
const router = express.Router();
const controladorLogin = require('../controladores/controladorLogin.js');
const controladorClientes = require('../controladores/controladorClientes.js');
const { validarRegistro, validarLogin } = require('../util/validate.js');

router.post('/registro', [validarRegistro, controladorClientes.clienteRegistro]);
router.post('/login', [validarLogin, controladorLogin.usuarioLogin]);
router.post('/logout', controladorLogin.usuarioLogout);

module.exports = router;