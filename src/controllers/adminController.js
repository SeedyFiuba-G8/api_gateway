module.exports = function $adminController(expressify, adminService) {
  return expressify({
    login,
    register
  });

  /**
   * @returns {Promise}
   */
  async function login(req, res) {
    const credentials = req.body;
    const session = await adminService.login(credentials);

    return res.status(200).json(session);
  }

  /**
   * @returns {Promise}
   */
  async function register(req, res) {
    const adminData = req.body;
    await adminService.register(adminData);

    return res.status(201).send();
  }
};
