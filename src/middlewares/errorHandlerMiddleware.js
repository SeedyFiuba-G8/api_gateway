module.exports = function $errorHandlerMiddleware() {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const status = err.status || 404;

    const response = {
      error: {
        name: err.name || 'Error',
        message: err.message,
        data: err.data
      }
    };

    return res.status(status).json(response);
  };
};
