const v2 = require('express').Router();

//Middlewares
const CheckPrescriptionPayload = require('../app/middlewares/CheckPrescriptionPayload');

//Controllers
const PrescriptionController = require('../app/controllers/PrescriptionController');

//Routes
v2.post('/prescriptions', CheckPrescriptionPayload, PrescriptionController.store);

module.exports = v2;