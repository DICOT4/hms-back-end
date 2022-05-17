const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class ActivePatientsLabTest extends Model {
    }

    ActivePatientsLabTest.init({
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
        laboratoryId: {
            type: DataTypes.BIGINT,
            references: {
                model: 'user',
                key: 'id'
            },
            require: true
        },
        labTestId: {
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
        labTestId: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'activePatientsLabTest',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
    });

    return ActivePatientsLabTest;
};