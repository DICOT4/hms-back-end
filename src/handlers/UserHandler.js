const {responseHandler, errorHandler} = require('./../httpResponse');
const {User} = require('../models');

module.exports.addUser = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body)
    console.log(body);
    let user = await User.create({...body})
    callback(
      null, responseHandler({
        user
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.getUsers = async (event, context, callback) => {
  try {
    let users = await User.findAll()
    callback(
      null, responseHandler({
        users
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.getDoctorUsers = async (event, context, callback) => {
  try {
    let users = await User.findAll({
      where: {
        role: 'doctor'
      }
    });
    callback(
      null, responseHandler({
        users
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};