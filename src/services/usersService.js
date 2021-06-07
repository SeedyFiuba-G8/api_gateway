const jwt = require('jsonwebtoken');

module.exports = function usersService(config, usersGateway) {
  return {
    login,
    register
  };

  /**
   * @returns {Promise}
   */
  async function login(credentials) {
    const id = await usersGateway.login(credentials);
    const token = await jwt.sign({ id }, config.jwt.key, {
      expiresIn: config.jwt.expiration
    });

    return {
      id,
      token
    };
  }

  /**
   * @returns {Promise}
   */
  function register(userData) {
    return usersGateway.register(userData);
  }
};
