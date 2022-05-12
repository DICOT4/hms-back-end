module.exports = {
    
  responseHandler: (data, statusCode = 200) => ({
    statusCode,
    body: JSON.stringify({
      status: statusCode,
      data
    }),
  }),

  errorHandler: (data, statusCode = 400) => ({
    statusCode,
    body: JSON.stringify({
      status: statusCode,
      data
    }),
  }),
};