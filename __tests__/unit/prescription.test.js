const { Prescription } = require('../../src/app/models');

describe('Prescription\'s model\'s operations', () => {
    it('should be persist prescription', async (done) => {
        const prescriptionSaved = await Prescription.create({
            clinic_id: 1,
            physician_id: 1,
            patient_id: 1,
            text: 'bla bla'
        });

        const prescriptionRecovered = await Prescription.findByPk(prescriptionSaved.id);

        expect(prescriptionSaved.clinic_id).toBe(prescriptionRecovered.clinic_id);
        expect(prescriptionSaved.physician_id).toBe(prescriptionRecovered.physician_id);
        expect(prescriptionSaved.patient_id).toBe(prescriptionRecovered.patient_id);
        expect(prescriptionSaved.text).toBe(prescriptionRecovered.text);
        done();
    });

    it('should be send message error for save prescription without clinic', async (done) => {
        await Prescription.create({
            physician_id: 1,
            patient_id: 1,
            text: 'bla bla'
        }).catch(e => {
            expect(e.message).toMatch('error');
            done();
        });
    });

    it('should be send message error for save prescription without physician', async (done) => {
        await Prescription.create({
            clinic_id: 1,
            patient_id: 1,
            text: 'bla bla'
        }).catch(e => {
            expect(e.message).toMatch('error');
            done();
        });
    });

    it('should be send message error for save prescription without patient', async (done) => {
        await Prescription.create({
            clinic_id: 1,
            physician_id: 1,
            text: 'bla bla'
        }).catch(e => {
            expect(e.message).toMatch('error');
            done();
        });
    });

    it('should be send message error for save prescription without text', async (done) => {
        await Prescription.create({
            clinic_id: 1,
            physician_id: 1,
            patient_id: 1
        }).catch(e => {
            expect(e.message).toMatch('error');
            done();
        });
    });
});