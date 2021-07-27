module.exports = function $metricController(
  apikeys,
  expressify,
  innerForward,
  services,
  urlFactory
) {
  return expressify({
    getAccountBasic,
    getAccountEvents,
    getProjectBasic,
    getProjectEvents
  });

  async function getAccountBasic(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics'),
      services.users.baseUrl
    );
    const { users: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }

  async function getAccountEvents(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics/events'),
      services.users.baseUrl
    );
    const { users: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }

  async function getProjectBasic(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics'),
      services.core.baseUrl
    );
    const { core: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }

  async function getProjectEvents(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics/events'),
      services.core.baseUrl
    );
    const { core: apikey } = await apikeys;

    return innerForward(req, res, apikey);
  }
};
