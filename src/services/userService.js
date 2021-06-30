const jwt = require('jsonwebtoken');

module.exports = function $userService(config, usersGateway) {
  return {
    getAll,
    getProfile,
    login,
    register
  };

  function getAll() {
    return usersGateway.getAllUsers();
  }

  function getProfile(userId) {
    return usersGateway.getProfile(userId);
  }

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

  function register(userData) {
    return usersGateway.register(userData, 'USER');
  }
};
