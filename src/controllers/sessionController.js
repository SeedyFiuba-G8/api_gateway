module.exports = function $sessionController(
  apikeys,
  apikeyUtils,
  expressify,
  forwardingService,
  logger,
  services,
  sessionService,
  urlFactory
) {
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

    if (credentials.fbToken && type === 'USER') {
      const { core: coreApikey } = await apikeys;

      try {
        const getWalletUrl = urlFactory(
          `wallets/${session.id}`,
          services.core.baseUrl
        );

        await forwardingService.forward(
          {},
          {
            method: 'GET',
            url: getWalletUrl,
            headers: apikeyUtils.headers(coreApikey)
          }
        );
      } catch (err) {
        const postWalletUrl = urlFactory('wallets', services.core.baseUrl);
        const postWalletRes = await forwardingService.forward(
          {},
          {
            body: { uid: session.id },
            method: 'POST',
            url: postWalletUrl,
            headers: apikeyUtils.headers(coreApikey)
          }
        );
        logger.info(
          `Wallet address ${postWalletRes.data} created for user ${session.id}`
        );
      }
    }

    return res.status(200).json(session);
  }
};
