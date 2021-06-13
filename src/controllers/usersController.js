module.exports = function usersController(usersService) {
  return {
    // Users
    loginAdmin,
    registerAdmin,

    // Admins
    loginUser,
    registerUser
  };

  /**
   * @returns {Promise}
   */
  function loginAdmin(req, res) {
    return login(req, res, 'ADMIN');
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
  function loginUser(req, res) {
    return login(req, res, 'USER');
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
  async function login(req, res, type) {
    const credentials = req.body;
    const session = await usersService.login(credentials, type);

    return res.status(200).json(session);
  }
};
