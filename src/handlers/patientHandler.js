const {responseHandler, errorHandler} = require('./../httpResponse');
const {Patient, ActivePatient, User} = require('../models');

module.exports.addPatient = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body)
    let patient = await Patient.create({...body});
    callback(
      null, responseHandler({
        patient
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};


module.exports.getPatients = async (event, context, callback) => {
  try {
    let patients = await Patient.findAll()
    callback(
      null, responseHandler({
        patients
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.assignPatient = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body)
    let patient = await ActivePatient.create({...body});
    callback(
      null, responseHandler({
        patient
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};
