const { checkSchema } = require('express-validator');

module.exports = checkSchema({
    'clinic.id': {
        in: ['body'],
        errorMessage: 'malformed request',
        isInt: true,
        toInt: true
    },
    'physician.id': {
        in: ['body'],
        errorMessage: 'malformed request',
        isInt: true,
        toInt: true
    },
    'patient.id': {
        in: ['body'],
        errorMessage: 'malformed request',
        isInt: true,
        toInt: true
    },
    text: {
        in: ['body'],
        errorMessage: 'malformed request',
        isString: true
    },
});