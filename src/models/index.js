const sequelize = require('./database');
const Sequelize = require('sequelize');

const database = { 
    sequelize, Sequelize 
};

const User = require('./userModel')(sequelize, Sequelize);
const Patient = require('./patientModel')(sequelize, Sequelize);
const ActivePatient = require('./activePatientModel')(sequelize, Sequelize);
const ActivePatientPrescription = require('./activePatientPrescriptionModel')(sequelize, Sequelize, User,Patient );
const ActivePatientLabTest = require('./activePatientLabTestModel')(sequelize, Sequelize);

User.hasMany(ActivePatient, {
    as: 'patients',
    foreignKey: 'doctorId'
});
Patient.hasMany(ActivePatient, {
    as: 'patient_active',
    foreignKey: 'patientId'
});

User.hasMany(ActivePatientPrescription, {
    as: 'prescriptions',
    foreignKey: 'doctorId'
});
User.hasMany(ActivePatientPrescription, {
    as: 'pharmacy_prescriptions',
    foreignKey: 'pharmacyId'
});
Patient.hasMany(ActivePatientPrescription, {
    as: 'patient_prescriptions',
    foreignKey: 'patientId'
});


User.hasMany(ActivePatientLabTest, {
    as: 'labtest',
    foreignKey: 'doctorId'
});
User.hasMany(ActivePatientLabTest, {
    as: 'lab_labtest',
    foreignKey: 'laboratoryId'
});
Patient.hasMany(ActivePatientLabTest, {
    as: 'patient_labtest',
    foreignKey: 'patientId'
});

const models = {
    User,
    Patient,
    ActivePatient,
    ActivePatientPrescription,
    ActivePatientLabTest
};

module.exports = {...database, ...models};