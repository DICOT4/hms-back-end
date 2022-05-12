const {responseHandler, errorHandler} = require('./src/httpResponse');

module.exports.healthCheck = async (event, context, callback) => {
  try {
    callback(
      null, responseHandler({
        message: 'Serverless function executed successfully!',
        input: event,
      })
    );
  } catch (error) {
    callback(null, errorHandler(error));
  }
};


