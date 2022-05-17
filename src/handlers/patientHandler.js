const { responseHandler, errorHandler } = require("./../httpResponse");
const {
  Patient,
  ActivePatient,
  ActivePatientPrescription,
  ActivePatientLabTest,
  User,
} = require("../models");

module.exports.addPatient = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body);
    let patient = await Patient.create({ ...body });
    callback(
      null,
      responseHandler({
        patient,
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.getPatients = async (event, context, callback) => {
  try {
    let patients = await Patient.findAll();
    callback(
      null,
      responseHandler({
        patients,
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.assignPatient = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body);
    let patient = await ActivePatient.create({ ...body });
    callback(
      null,
      responseHandler({
        patient,
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.getDoctorPatients = async (event, context, callback) => {
  try {
    let data = JSON.parse(
      JSON.stringify(
        await User.findAll({
          where: {
            id: event.queryStringParameters.doctorId,
          },
          include: [
            {
              model: ActivePatient,
              as: "patients",
            },
            { model: ActivePatientPrescription, as: "prescriptions" },
            { model: ActivePatientLabTest, as: "labtest" },
          ],
        })
      )
    );
    let patients = [];
    for (patient of data[0].patients) {
      patients.push({
        ...patient,
        ...JSON.parse(
          JSON.stringify(
            await Patient.findAll({
              where: {
                id: patient.patientId,
              },
            })
          )
        )[0],
      });
    }
    data[0].patients = patients;
    callback(null, responseHandler(data[0]));
  } catch (error) {
    console.log(error);
    callback(null, errorHandler(error));
  }
};

module.exports.getSinglePatients = async (event, context, callback) => {
  try {
    let prescriptions = JSON.parse(
      JSON.stringify(
        await ActivePatientPrescription.findAll({
          where: {
            patientId: event.queryStringParameters.patientId,
          },
        })
      )
    );
    let labtests = JSON.parse(
      JSON.stringify(
        await ActivePatientLabTest.findAll({
          where: {
            patientId: event.queryStringParameters.patientId,
          },
        })
      )
    );
    let patient = JSON.parse(
      JSON.stringify(
        await Patient.findByPk(event.queryStringParameters.patientId)
      )
    );
    callback(null, responseHandler({ patient, prescriptions, labtests }));
  } catch (error) {
    console.log(error);
    callback(null, errorHandler(error));
  }
};


module.exports.getSingleLaboratory = async (event, context, callback) => {
  try {
    let labtests = JSON.parse(
      JSON.stringify(
        await ActivePatientLabTest.findAll({
          where: {
            laboratoryId: event.queryStringParameters.laboratoryId,
          },
        })
      )
    );
    let laboratory = JSON.parse(
      JSON.stringify(
        await User.findByPk(event.queryStringParameters.laboratoryId)
      )
    );
    callback(null, responseHandler({ laboratory, labtests }));
  } catch (error) {
    console.log(error);
    callback(null, errorHandler(error));
  }
};

module.exports.getSinglePharmacy = async (event, context, callback) => {
  try {
    let prescriptions = JSON.parse(
      JSON.stringify(
        await ActivePatientPrescription.findAll({
          where: {
            pharmacyId: event.queryStringParameters.pharmacyId,
          },
        })
      )
    );
    let pharmacy = JSON.parse(
      JSON.stringify(
        await User.findByPk(event.queryStringParameters.pharmacyId)
      )
    );
    callback(null, responseHandler({ pharmacy, prescriptions }));
  } catch (error) {
    console.log(error);
    callback(null, errorHandler(error));
  }
};
