const { body } = require('express-validator');

validarRegistro = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres')
        .escape(),
    body('mail')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe ser un email válido')
        .normalizeEmail(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .escape(),
    body('city')
        .trim()
        .notEmpty().withMessage('La ciudad es obligatoria')
        .isLength({ min: 2 }).withMessage('La ciudad debe tener al menos 2 caracteres')
        .escape()
];

validarLogin = [
    body('identificador')
        .trim()
        .notEmpty().withMessage('El identificador es obligatorio')
        .escape(),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .escape(),
];

module.exports = { validarLogin, validarRegistro }