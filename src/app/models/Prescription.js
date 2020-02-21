module.exports = (sequelize, DataTypes) => {
    try {
        const Prescription = sequelize.define('Prescription', {
            clinic_id: DataTypes.INTEGER,
            physician_id: DataTypes.INTEGER,
            patient_id: DataTypes.INTEGER,
            text: DataTypes.TEXT,
        });

        return Prescription;
    } catch (e) {
        console.error(e);
    }
};