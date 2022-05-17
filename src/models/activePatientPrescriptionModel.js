const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ActivePatientsPrescription extends Model {
    }

    ActivePatientsPrescription.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        patientId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'patient',
                key: 'id'
            },
            require: true
        },
        doctorId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'user',
                key: 'id'
            },
            require: true
        },
        pharmacyId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'user',
                key: 'id'
            },
            require: true
        },
        ipfsHash: {
            type: DataTypes.STRING,
        },
        prescriptionId: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'activePatientsPrescription',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
    });

    return ActivePatientsPrescription;
};