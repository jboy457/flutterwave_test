const errorResponseMsg = (res, status, message, data) => res.status(status).json({
    message,
    status: 'error',
    data
  });
  
  const successResponseMsg = (res, status = 200, message, data) => res.status(status).json({
    message,
    status: 'success',
    data
  });

  
module.exports.errorResponseMsg = errorResponseMsg;
module.exports.successResponseMsg = successResponseMsg;