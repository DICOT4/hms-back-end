const sequelize = require('./database');
const Sequelize = require('sequelize');

const database = { 
    sequelize, Sequelize 
};

const User = require('./userModel')(sequelize, Sequelize);
const Patient = require('./patientModel')(sequelize, Sequelize);
const ActivePatient = require('./activePatientModel')(sequelize, Sequelize);

User.belongsToMany(Patient, { through: ActivePatient, foreignKey: 'doctorId' });
Patient.belongsToMany(User, { through: ActivePatient, foreignKey: 'patientId' });

const models = {
    User,
    Patient,
    ActivePatient
};

module.exports = {...database, ...models};