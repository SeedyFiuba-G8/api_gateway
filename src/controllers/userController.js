module.exports = function $userController(
  apikeys,
  apikeyUtils,
  expressify,
  forwardingService,
  logger,
  services,
  urlFactory
) {
  return expressify({
    create,
    get
  });

  async function create(req, res) {
    const { core: coreApikey, users: userApikey } = await apikeys;

    const postUserUrl = urlFactory(req.originalUrl, services.users.baseUrl);
    const postWalletUrl = urlFactory('wallets', services.core.baseUrl);

    const { body, context, method } = req;

    const postUserRes = await forwardingService.forward(context, {
      body,
      method,
      url: postUserUrl,
      headers: apikeyUtils.headers(userApikey)
    });

    logger.info(
      `User ${postUserRes.data.id} with email ${postUserRes.data.email} created`
    );

    const postWalletRes = await forwardingService.forward(
      {},
      {
        body: { uid: postUserRes.data.id },
        method,
        url: postWalletUrl,
        headers: apikeyUtils.headers(coreApikey)
      }
    );

    logger.info(
      `Wallet address ${postWalletRes.data} created for user ${postUserRes.data.id}`
    );

    return res.status(postUserRes.status).json({ id: postUserRes.data.id });
  }

  async function get(req, res) {
    const { core: coreApikey, users: userApikey } = await apikeys;

    const getUserUrl = urlFactory(req.originalUrl, services.users.baseUrl);

    const { body, context, method } = req;

    const getUserRes = await forwardingService.forward(context, {
      body,
      method,
      url: getUserUrl,
      headers: apikeyUtils.headers(userApikey)
    });

    if (context.session.id !== req.params.userId)
      return res.status(getUserRes.status).json(getUserRes.data);

    const getWalletUrl = urlFactory(
      `wallets/${req.params.userId}`,
      services.core.baseUrl
    );

    const getWalletRes = await forwardingService.forward(
      {},
      {
        method: 'GET',
        url: getWalletUrl,
        headers: apikeyUtils.headers(coreApikey)
      }
    );

    return res
      .status(getUserRes.status)
      .json({ ...getUserRes.data, ...getWalletRes.data });
  }
};
