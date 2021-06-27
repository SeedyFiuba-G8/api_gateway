module.exports = function $userController(expressify, userService) {
  return expressify({
    getAll,
    login,
    register
  });

  /**
   * @returns {Promise}
   */
  async function getAll(req, res) {
    const users = await userService.getAllUsers();

    return res.status(200).json(users);
  }

  /**
   * @returns {Promise}
   */
  async function login(req, res) {
    const credentials = req.body;
    const session = await userService.login(credentials);

    return res.status(200).json(session);
  }

  /**
   * @returns {Promise}
   */
  async function register(req, res) {
    const userData = req.body;
    await userService.register(userData);

    return res.status(201).send();
  }
};
