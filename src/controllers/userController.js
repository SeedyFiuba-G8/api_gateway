module.exports = function $userController(
  expressify,
  forwardingService,
  logger,
  services,
  urlFactory
) {
  return expressify({
    create
  });

  async function create(req, res) {
    const postUserUrl = urlFactory(req.originalUrl, services.users.baseUrl);
    const postWalletUrl = urlFactory('wallets', services.core.baseUrl);

    const { body, context, method } = req;

    const postUserRes = await forwardingService.forward(context, {
      body,
      method,
      url: postUserUrl
    });

    logger.info(
      `User ${postUserRes.data.id} with email ${postUserRes.data.email} created`
    );

    const postWalletRes = await forwardingService.forward(
      { uid: postUserRes.data.id },
      {
        method,
        url: postWalletUrl
      }
    );

    logger.info(
      `Wallet address ${postWalletRes.data} created for user ${postUserRes.data.id}`
    );

    return res
      .status(postUserRes.status)
      .json({ ...postUserRes.data, address: postWalletRes.data });
  }
};
