const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {

    class Doctor extends Model {
    }

    Doctor.init({
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        patientId: {
            type: DataTypes.INTEGER,
            require: true
        },
        doctorId: {
            type: DataTypes.INTEGER,
            require: true
        },
        status: {
            type: DataTypes.ENUM("1", "2"),
            defaultValue: "1",
        },
    }, {
        sequelize,
        modelName: 'activePatients',
        freezeTableName: true,
        underscored: true,
        timestamps: true,
        paranoid: true,
    });

    return Doctor;
};