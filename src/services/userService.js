const jwt = require('jsonwebtoken');

module.exports = function $userService(config, usersGateway) {
  return {
    getAll,
    login,
    register
  };

  /**
   * @returns {Promise}
   */
  function getAll() {
    return usersGateway.getAllUsers();
  }

  /**
   * @returns {Promise}
   */
  async function login(credentials) {
    const type = 'USER';
    const id = await usersGateway.login(credentials, type);
    const token = await jwt.sign({ id, type }, config.jwt.key, {
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
    return usersGateway.register(userData, 'USER');
  }
};
