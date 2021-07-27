module.exports = function $forwardingController(
  apikeys,
  expressify,
  innerForward,
  services,
  urlFactory
) {
  return expressify({
    core,
    users
  });

  async function core(req, res) {
    req.url = urlFactory(req.originalUrl, services.core.baseUrl);
    const { core: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }

  async function users(req, res) {
    req.url = urlFactory(req.originalUrl, services.users.baseUrl);
    const { users: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }
};
