module.exports = function $forwardingController(
  apikeys,
  apikeyUtils,
  config,
  expressify,
  forwardingService,
  services,
  urlFactory
) {
  return expressify({
    core,
    forward,
    users
  });

  async function core(req, res) {
    req.url = urlFactory(req.originalUrl, services.core.baseUrl);
    const { core: apikey } = await apikeys;

    return forward(req, res, apikey);
  }

  async function users(req, res) {
    req.url = urlFactory(req.originalUrl, services.users.baseUrl);
    const { users: apikey } = await apikeys;

    return forward(req, res, apikey);
  }

  // Aux

  function forward(req, res, apikey) {
    const { body, context, method, url } = req;

    return forwardingService
      .forward(context, {
        url,
        method,
        body,
        headers: apikeyUtils.headers(apikey)
      })
      .then(({ status, data }) => {
        if (!data) return res.status(status).send();
        return res.status(status).json(data);
      });
  }
};
