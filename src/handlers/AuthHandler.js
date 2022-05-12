const {responseHandler, errorHandler} = require('./../httpResponse');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { User } = require('../models');

module.exports.login = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body)
    let user = await User.findOne({
      where: {
        [Op.or]: [
          { email: body.email },
          { userName: body.email }
        ]
      }
    });
    if(!user || !await user.isPasswordMatch(body.password)) {
      callback(null, errorHandler({message: "Invalid email or password"}));
    }
    callback(
      null, responseHandler({
        user,
        token: jwt.sign({ id: user.id }, process.env.JWT_SECRET)
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};

module.exports.me = async (event, context, callback) => {
  try {
    let { body = {} } = event;
    body = JSON.parse(body)
    let user = await User.findOne({
      where: {
        id: event?.requestContext?.authorizer?.principalId
      }
    });
    if(!user) {
      callback(null, errorHandler({message: "Invalid user"}));
    }
    callback(
      null, responseHandler({
        user
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};


const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
}

module.exports.auth = (event, context, callback) => {

  const token = event.authorizationToken;

  if (!token)
    return callback(null, 'Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return callback(null, 'Unauthorized');
    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn))
  });

};