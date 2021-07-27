module.exports = function $metricController(
  apikeys,
  expressify,
  forwardingController,
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

    return forwardingController.forward(req, res, apikey);
  }

  async function getAccountEvents(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics/events'),
      services.users.baseUrl
    );
    const { users: apikey } = await apikeys;

    return forwardingController.forward(req, res, apikey);
  }

  async function getProjectBasic(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics'),
      services.core.baseUrl
    );
    const { core: apikey } = await apikey;

    return forwardingController.forward(req, res, apikey);
  }

  async function getProjectEvents(req, res) {
    req.url = urlFactory(
      req.originalUrl.replace(req.path, '/metrics/events'),
      services.core.baseUrl
    );
    const { core: apikey } = await apikeys;

    return forwardingController.forward(req, res, apikey);
  }
};
