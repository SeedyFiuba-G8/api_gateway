module.exports = function usersController(expressify, usersService) {
  return expressify({
    getAllUsers,
    loginAdmin,
    loginUser,
    registerAdmin,
    registerUser
  });

  /**
   * @returns {Promise}
   */
  async function getAllUsers(req, res) {
    const users = await usersService.getAllUsers();

    return res.status(200).json(users);
  }

  /**
   * @returns {Promise}
   */
  function loginAdmin(req, res, next) {
    return login(req, res, next, 'ADMIN');
  }

  /**
   * @returns {Promise}
   */
  function loginUser(req, res, next) {
    return login(req, res, next, 'USER');
  }

  /**
   * @returns {Promise}
   */
  async function registerAdmin(req, res) {
    const adminData = req.body;
    await usersService.registerAdmin(adminData);

    return res.status(201).send();
  }

  /**
   * @returns {Promise}
   */
  async function registerUser(req, res) {
    const userData = req.body;
    await usersService.registerUser(userData);

    return res.status(201).send();
  }

  // Private

  /**
   * @returns {Promise}
   */
  async function login(req, res, next, type) {
    const credentials = req.body;
    const session = await usersService.login(credentials, type);

    return res.status(200).json(session);
  }
};
