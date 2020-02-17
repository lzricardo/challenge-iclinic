const { validationResult } = require('express-validator');
const ClinicService = require('../../services/clinic');
const MetricService = require('../../services/metric');
const PatientService = require('../../services/patient');
const PhysicianService = require('../../services/physician');
const Prescription = sequelizeConn.import('../models/Prescription');

class PrescriptionController {
    async store(req, res) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: {
                    message: "malformed request",
                    code: "01"
                }
            });
        }

        let body = req.body;
        let getClinicError = false;
        let clinic;
        let physician;
        let patient;

        try {
            physician = await PhysicianService.getById(body.physician.id);
        } catch (e) {
            return res.status(e.status).json({
                error: {
                    message: e.message,
                    code: e.code
                }
            });
        }

        try {
            patient = await PatientService.getById(body.patient.id);
        } catch (e) {
            return res.status(e.status).json({
                error: {
                    message: e.message,
                    code: e.code
                }
            });
        }

        try {
            clinic = await ClinicService.getById(body.clinic.id);
        } catch (e) {
            getClinicError = true;
        }

        return sequelizeConn.transaction(t => {
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

                console.log('METRIC => ', metric);

                await MetricService.send(metric);
            } catch (e) {
                // res.status(e.status).json({
                //     error: {
                //         message: e.message,
                //         code: e.code
                //     }
                // });

                res.status(400);
                throw new Error();
            }

            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
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
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
            console.error(err);
        });
    }
}

module.exports = new PrescriptionController;