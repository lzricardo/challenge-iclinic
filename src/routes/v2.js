const v2 = require('express').Router();

//Middlewares
const CheckPrescriptionPayload = require('../app/middlewares/CheckPrescriptionPayload');

//Controllers
const PrescriptionController = require('../app/controllers/PrescriptionController');

//Routes
v2.post('/prescriptions', CheckPrescriptionPayload, PrescriptionController.store);
v2.get('/prescriptions', (req, res) => {
    res.status(200).send('HELLO');
});

module.exports = v2;