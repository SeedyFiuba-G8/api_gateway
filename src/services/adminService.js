const jwt = require('jsonwebtoken');

module.exports = function $adminService(config, usersGateway) {
  return {
    login,
    register
  };

  /**
   * @returns {Promise}
   */
  async function login(credentials) {
    const type = 'ADMIN';
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
  function register(adminData) {
    return usersGateway.register(adminData, 'ADMIN');
  }
};
