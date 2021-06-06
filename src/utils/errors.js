// HTTP Status Codes
// https://www.restapitutorial.com/httpstatuscodes.html

class CustomError extends Error {
  constructor(
    status,
    name,
    message = undefined,
    data = undefined,
    errors = undefined
  ) {
    super(name);
    this.status = status;
    this.name = name;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}

module.exports = function $errors() {
  return {
    BadRequest,
    InternalServerError,
    Unauthorized
  };
};

function BadRequest(message, data = undefined) {
  return new CustomError(400, 'Bad Request', message, data);
}

function InternalServerError() {
  return new CustomError(
    500,
    'Internal Server Error',
    'Unexpected error. Please see output from Server.'
  );
}

function Unauthorized(message, data = undefined) {
  return new CustomError(401, 'Unauthorized', message, data);
}
