const routes = require('express').Router();

const { Prescription } = require('./app/models');

try {
    console.log(Prescription.create({
            clinic_id: 1,
            physician_id: 1,
            patient_id: 1,
            text: 'bla bla'
    }

    ));
} catch (e) {
    console.error(e);
}


module.exports = routes;