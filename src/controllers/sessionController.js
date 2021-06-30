module.exports = function $sessionController(expressify, sessionService) {
  return expressify({
    loginAdmin,
    loginUser
  });

  async function loginAdmin(req, res) {
    return login(req, res, 'ADMIN');
  }

  async function loginUser(req, res) {
    return login(req, res, 'USER');
  }

  // Private

  async function login(req, res, type) {
    const credentials = req.body;
    const session = await sessionService.login(credentials, type);

    return res.status(200).json(session);
  }
};
