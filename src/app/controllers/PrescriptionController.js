const { validationResult } = require('express-validator');
const ErrorMessageHelper = require('../../helpers/error-message');
const RequestHelper = require('../../helpers/request');
const ClinicService = require('../../services/clinic');
const MetricService = require('../../services/metric');
const PatientService = require('../../services/patient');
const PhysicianService = require('../../services/physician');
const { Prescription, sequelize } = require('../models');

class PrescriptionController {
    async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let statusCode = 400;

            return res.status(statusCode).json(ErrorMessageHelper.process('RE', statusCode));
        }

        let body = req.body;
        let getClinicError = false;
        let clinic;
        let physician;
        let patient;

        try {
            physician = await PhysicianService.getById(body.physician.id);
        } catch (e) {
            let statusCode = RequestHelper.processError(e);
            return res.status(statusCode).json(ErrorMessageHelper.process('PH', statusCode));
        }

        try {
            patient = await PatientService.getById(body.patient.id);
        } catch (e) {
            let statusCode = RequestHelper.processError(e);
            return res.status(statusCode).json(ErrorMessageHelper.process('PA', statusCode));
        }

        try {
            clinic = await ClinicService.getById(body.clinic.id);
        } catch (e) {
            getClinicError = true;
        }

        try {
            return sequelize.transaction(t => {
                return Prescription.create({
                    clinic_id: body.clinic.id,
                    physician_id: body.physician.id,
                    patient_id: body.patient.id,
                    text: body.text
                }, {transaction: t});
            }).then(async prescription => {
                try {
                    let metric = {
                        clinic_id: clinic.id,
                        clinic_name: (getClinicError) ? null : clinic.name,
                        physician_id: physician.id,
                        physician_name: physician.fullName,
                        physician_crm: physician.crm,
                        patient_id: patient.id,
                        patient_name: patient.fullName,
                        patient_email: patient.email,
                        patient_phone: patient.phone
                    };

                    await MetricService.send(metric);
                } catch (e) {
                    let statusCode = RequestHelper.processError(e);
                    res.status(statusCode).json(ErrorMessageHelper.process('ME', statusCode));
                    throw new Error(e);
                }

                console.log('Committed database\'s operation');

                return res.status(200).json({
                    data: {
                        id: prescription.id,
                        clinic: {
                            id: prescription.clinic_id
                        },
                        physician: {
                            id: prescription.physician_id
                        },
                        patient: {
                            id: prescription.patient_id
                        }
                    }
                });
            }).catch(err => {
                console.log('Rolled back database\'s operation');
                console.error(err);
            });
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new PrescriptionController;