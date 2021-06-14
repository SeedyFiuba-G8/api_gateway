module.exports = function usersController(usersService) {
  return {
    getAllUsers,
    loginAdmin,
    loginUser,
    registerAdmin,
    registerUser
  };

  /**
   * @returns {Promise}
   */
  async function getAllUsers(req, res, next) {
    let users;

    try {
      users = await usersService.getAllUsers();
    } catch (err) {
      return next(err);
    }

    return res.status(200).send(users);
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
  async function registerAdmin(req, res, next) {
    const adminData = req.body;

    try {
      await usersService.registerAdmin(adminData);
    } catch (err) {
      return next(err);
    }

    return res.status(201).send();
  }

  /**
   * @returns {Promise}
   */
  async function registerUser(req, res, next) {
    const userData = req.body;

    try {
      await usersService.registerUser(userData);
    } catch (err) {
      return next(err);
    }

    return res.status(201).send();
  }

  // Private

  /**
   * @returns {Promise}
   */
  async function login(req, res, next, type) {
    const credentials = req.body;
    let session;

    try {
      session = await usersService.login(credentials, type);
    } catch (err) {
      return next(err);
    }

    return res.status(200).json(session);
  }
};
