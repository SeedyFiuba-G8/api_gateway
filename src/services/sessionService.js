const jwt = require('jsonwebtoken');

module.exports = function $sessionService(config, usersGateway) {
  return {
    login
  };

  async function login(credentials, type) {
    const id = await usersGateway.login(credentials, type);
    const token = await jwt.sign({ id, type }, config.jwt.key, {
      expiresIn: config.jwt.expiration
    });

    return {
      id,
      token
    };
  }
};
