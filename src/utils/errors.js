// HTTP Status Codes
// https://www.restapitutorial.com/httpstatuscodes.html

module.exports = function $errors() {
  return {
    // Auth errors
    invalidTokenType: BadRequest('Invalid token type: not bearer'),
    noTokenProvided: BadRequest('No bearer token provided')
  };
};

function errorFactory(status, name, message, data = undefined) {
  const err = {
    status,
    name,
    message
  };

  if (data) err.data = data;

  return err;
}

function BadRequest(message, data = undefined) {
  return errorFactory(400, 'Bad request', message, data);
}

// function Unauthorized(message, data = undefined) {
//   return errorFactory(401, 'Unauthorized', message, data);
// }
