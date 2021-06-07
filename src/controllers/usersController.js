module.exports = function usersController(config, usersService) {
  return {
    login,
    register
  };

  /**
   * @returns {Promise}
   */
  async function login(req, res, next) {
    const credentials = req.body;
    let session;

    try {
      session = await usersService.login(credentials);
    } catch (err) {
      return next(err);
    }

    return res.status(200).json(session);
  }

  /**
   * @returns {Promise}
   */
  async function register(req, res, next) {
    const userData = req.body;

    try {
      await usersService.register(userData);
    } catch (err) {
      return next(err);
    }

    return res.status(201).send();
  }
};
