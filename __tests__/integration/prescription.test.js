const request = require('supertest');
const app = require('../../src/app');
const { Prescription } = require('../../src/app/models');
const truncate = require('../utils/truncate');

beforeEach(async () => {
    await truncate();
});

describe('Prescription\'s persistence with your dependencies', () => {
    it('should be send message error for save prescription with malformed request', async () => {
        const responseWithoutClinic = await request(app)
            .post('/v2/prescriptions')
            .send({
                physician: {
                    id: 1
                },
                patient: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(responseWithoutClinic.status).toBe(400)
        expect(responseWithoutClinic.body).toEqual({
            error: {
                message: "malformed request",
                code: "01"
            }
        });

        const responseWithoutPhysician = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic_id: {
                    id: 1
                },
                patient: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(responseWithoutPhysician.status).toBe(400)
        expect(responseWithoutPhysician.body).toEqual({
            error: {
                message: "malformed request",
                code: "01"
            }
        });

        const responseWithoutPatient = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic_id: {
                    id: 1
                },
                physician: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(responseWithoutPatient.status).toBe(400)
        expect(responseWithoutPatient.body).toEqual({
            error: {
                message: "malformed request",
                code: "01"
            }
        });

        const responseWithoutText = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic_id: {
                    id: 1
                },
                physician: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(responseWithoutText.status).toBe(400)
        expect(responseWithoutText.body).toEqual({
            error: {
                message: "malformed request",
                code: "01"
            }
        });
    });

    it('should be send message error for save prescription with physician not found', async () => {
        const response = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic: {
                    id: 1
                },
                physician: {
                    id: 9999
                },
                patient: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            error: {
                message: "physician not found",
                code: "02"
            }
        });
    });

    it('should be send message error for save prescription with patient not found', async () => {
        const response = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic: {
                    id: 1
                },
                physician: {
                    id: 1
                },
                patient: {
                    id: 9999
                },
                text: "Dipirona 1x ao dia"
            });

        expect(response.status).toBe(404)
        expect(response.body).toEqual({
            error: {
                message: "patient not found",
                code: "03"
            }
        });
    });

    it('should be persist prescription with success', async () => {
        const response = await request(app)
            .post('/v2/prescriptions')
            .send({
                clinic: {
                    id: 1
                },
                physician: {
                    id: 1
                },
                patient: {
                    id: 1
                },
                text: "Dipirona 1x ao dia"
            });

        expect(response.status).toBe(200);

        const prescriptionRecovered = await Prescription.findByPk(response.body.data.id);

        expect(response.body).toEqual({
            data: {
                id: prescriptionRecovered.id,
                clinic: {
                    id: prescriptionRecovered.clinic_id
                },
                physician: {
                    id: prescriptionRecovered.physician_id
                },
                patient: {
                    id: prescriptionRecovered.patient_id
                }
            }
        });
    });
});