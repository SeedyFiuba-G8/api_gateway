module.exports = function $forwardingController(
  expressify,
  forwardingService,
  gatewayUtils,
  services
) {
  return expressify({
    core,
    users
  });

  function core(req, res) {
    req.url = gatewayUtils.urlFactory(req.originalUrl, services.core.baseUrl);
    return forward(req, res);
  }

  function users(req, res) {
    req.url = gatewayUtils.urlFactory(req.originalUrl, services.users.baseUrl);
    return forward(req, res);
  }

  // Private

  function forward(req, res) {
    const { body, context, method, url } = req;

    return forwardingService
      .forward(context, { url, method, body })
      .then(({ status, data }) => {
        if (!data) return res.status(status).send();
        return res.status(status).json(data);
      });
  }
};
