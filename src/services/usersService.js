const jwt = require('jsonwebtoken');

module.exports = function usersService(config, usersGateway) {
  return {
    getAllUsers,
    login,
    registerAdmin,
    registerUser
  };

  /**
   * @returns {Promise}
   */
  function getAllUsers() {
    return usersGateway.getAllUsers();
  }

  /**
   * @returns {Promise}
   */
  async function login(credentials, type) {
    const id = await usersGateway.login(credentials, type);
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
  function registerUser(userData) {
    return usersGateway.registerUser(userData);
  }

  /**
   * @returns {Promise}
   */
  function registerAdmin(adminData) {
    return usersGateway.registerAdmin(adminData);
  }
};
