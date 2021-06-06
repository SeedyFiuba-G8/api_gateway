const jwt = require('jsonwebtoken');

module.exports = function usersController(config, usersGateway) {
  return {
    login,
    register
  };

  /**
   * @returns {Promise}
   */
  async function login(req, res, next) {
    // const credentials = req.body;
    // TODO: verificar que sean correctas

    // Todo esto viene de la DB
    const uuid = 'mock de uuid dasjkdasdks';

    let token;
    try {
      token = await jwt.sign({ uuid }, config.jwt.key, { expiresIn: '30s' });
    } catch (err) {
      return next(err);
    }

    return res.json({ uuid, token });
  }

  /**
   * @returns {Promise}
   */
  async function register(req, res, next) {
    const userData = req.body;

    try {
      await usersGateway.register(userData);
    } catch (err) {
      return next(err);
    }

    return res.status(201).send();
  }
};
